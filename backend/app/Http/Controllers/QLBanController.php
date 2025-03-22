<?php

namespace App\Http\Controllers;

use App\Models\Ban;
use App\Models\QuanLyHoaDon;
use Illuminate\Http\Request;

class QLBanController
{
    public function store(Request $request)
    {
        $request->validate([
            'b_tenban' => 'required|string|max:30',
            't_id' => 'required|integer'
        ]);

        $data = $request->all();

        $ban = Ban::create($data);

        return response()->json(['message' => 'Bàn được thêm thành công!', 'ban' => $ban], 201);
    }

    public function update(Request $request, $id)
    {
        $ban = Ban::find($id);

        $validatedData = $request->validate([
            'b_tenban' => 'required|string|max:30',
            't_id' => 'required|integer',
        ]);

        $ban->update($validatedData);


        return response()->json(['message' => 'Cập nhật bàn thành công!', 'ban' => $ban]);
    }

    public function destroy($id)
    {
        $ban = Ban::findOrFail($id);

        if (QuanLyHoaDon::where('b_id', $id)->exists()) {
            return response()->json(['message' => 'Không thể xóa! bàn đã có hóa đơn.'], 400);
        }

        $ban->delete();

        return response()->json(['message' => 'Xóa bàn thành công!']);
    }


    public function tatMoBan($id)
    {
        $ban = Ban::findOrFail($id);
        // Kiểm tra nếu bàn này có hóa đơn chưa thanh toán
        $banCoHoaDonChuaThanhToan = QuanLyHoaDon::where('b_id', $id)
            ->where('hd_daThanhToan', 0)
            ->exists();

        if ($banCoHoaDonChuaThanhToan) {
            return response()->json(['message' => 'Không thể tắt bàn vì khách chưa thanh toán'], 400);
        }
        $ban->update(['b_trangthai' => $ban->b_trangthai == 0 ? 1 : 0]);
        $kq = $ban->b_trangthai == 0 ? 'Bàn đã được tắt' : 'Bàn đã được mở';
        return response()->json(['message' => $kq]);
    }
}
