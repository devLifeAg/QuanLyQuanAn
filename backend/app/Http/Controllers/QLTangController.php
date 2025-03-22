<?php

namespace App\Http\Controllers;

use App\Models\Ban;
use App\Models\QuanLyHoaDon;
use App\Models\Tang;
use Illuminate\Http\Request;

class QLTangController
{
    public function store(Request $request)
    {
        $request->validate([
            't_tentang' => 'required|string|max:30',
        ]);

        $data = $request->all();

        $tang = Tang::create($data);

        return response()->json(['message' => 'Tầng được thêm thành công!', 'tang' => $tang], 201);
    }

    public function update(Request $request, $id)
    {
        $tang = Tang::find($id);

        $validatedData = $request->validate([
            't_tentang' => 'required|string|max:30',
        ]);

        $tang->update($validatedData);


        return response()->json(['message' => 'Cập nhật tầng thành công!', 'tang' => $tang]);
    }

    public function destroy($id)
    {
        $tang = Tang::findOrFail($id);

        if (Ban::where('t_id', $id)->exists()) {
            return response()->json(['message' => 'Không thể xóa! tầng đã có bàn.'], 400);
        }

        $tang->delete();

        return response()->json(['message' => 'Xóa tầng thành công!']);
    }


    public function tatMoTang($id)
    {
        $tang = Tang::findOrFail($id);
        // Kiểm tra nếu có bàn trong tầng này có hóa đơn chưa thanh toán
        $banCoHoaDonChuaThanhToan = QuanLyHoaDon::whereHas('ban', function ($query) use ($id) {
            $query->where('t_id', $id);
        })->where('hd_daThanhToan', 0)->exists();

        if ($banCoHoaDonChuaThanhToan) {
            return response()->json(['message' => 'Không thể tắt tầng vì có bàn đang có khách chưa thanh toán'], 400);
        }
        $tang->update(['t_trangthai' => $tang->t_trangthai == 0 ? 1 : 0]);
        $kq = $tang->t_trangthai == 0 ? 'Tầng đã được tắt' : 'Tầng đã được mở';
        return response()->json(['message' => $kq]);
    }
}
