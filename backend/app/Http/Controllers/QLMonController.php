<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MonAn;
use App\Models\ChiTietHoaDon;

class QLMonController
{
    /**
     * Thêm món ăn
     */
    public function store(Request $request)
    {
        $request->validate([
            'pl_id' => 'required|integer',
            'mon_tenmon' => 'required|string|max:50',
            'mon_giamon' => 'required|numeric',
            'mon_mota' => 'required|string|max:400',
            'mon_hinhmon' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('mon_hinhmon')) {
            $image = $request->file('mon_hinhmon');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('../../frontend/public/anh_mon'), $imageName);
            $data['mon_hinhmon'] = $imageName;
        }

        $monAn = MonAn::create($data);

        return response()->json(['message' => 'Món ăn được thêm thành công!', 'monan' => $monAn], 201);
    }

    /**
     * Cập nhật món ăn
     */
    public function update(Request $request, $id)
    {
        $monAn = MonAn::find($id);

        $validatedData = $request->validate([
            'pl_id' => 'required|integer',
            'mon_tenmon' => 'required|string|max:50',
            'mon_giamon' => 'required|numeric',
            'mon_mota' => 'required|string|max:400',
            'mon_hinhmon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('mon_hinhmon')) {
            // Xóa ảnh cũ
            if ($monAn->mon_hinhmon && file_exists(public_path('../../frontend/public/anh_mon/' . $monAn->mon_hinhmon))) {
                unlink(public_path('../../frontend/public/anh_mon/' . $monAn->mon_hinhmon));
            }

            $image = $request->file('mon_hinhmon');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('../../frontend/public/anh_mon'), $imageName);
            $validatedData['mon_hinhmon'] = $imageName;
        }

        $monAn->update($validatedData);
        

        return response()->json(['message' => 'Cập nhật món ăn thành công!', 'monan' => $monAn]);
    }

    /**
     * Xóa món ăn (kiểm tra ràng buộc với ChiTietHoaDon)
     */
    public function destroy($id)
    {
        $monAn = MonAn::findOrFail($id);

        // Kiểm tra nếu món ăn đã tồn tại trong bảng ChiTietHoaDon
        if (ChiTietHoaDon::where('mon_id', $id)->exists()) {
            return response()->json(['message' => 'Không thể xóa! Món ăn đang được sử dụng trong hóa đơn.'], 400);
        }

        // Xóa ảnh món ăn nếu có
        if ($monAn->mon_hinhmon && file_exists(public_path('../../frontend/public/anh_mon/' . $monAn->mon_hinhmon))) {
            unlink(public_path('../../frontend/public/anh_mon/' . $monAn->mon_hinhmon));
        }

        $monAn->delete();

        return response()->json(['message' => 'Xóa món ăn thành công!']);
    }

    /**
     * Tắt món ăn (cập nhật trạng thái thành 0)
     */
    public function tatMoMon($id)
    {
        $monAn = MonAn::findOrFail($id);
        $monAn->update(['mon_trangthai' => $monAn->mon_trangthai == 0 ? 1 : 0]);
        $kq = $monAn->mon_trangthai == 0 ? 'Món ăn đã được mở' : 'Món ăn đã được tắt';
        return response()->json(['message' => $kq]);
    }
}
