<?php

namespace App\Http\Controllers;

use App\Models\MonAn;
use App\Models\PhanLoaiMonAn;
use Illuminate\Http\Request;

class QLPhanLoaiController
{
    public function store(Request $request)
    {
        $request->validate([
            'pl_tenpl' => 'required|string|max:50',
            'pl_tenhinh' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('pl_tenhinh')) {
            $image = $request->file('pl_tenhinh');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('../../frontend/public/anh_phan_loai'), $imageName);
            $data['pl_tenhinh'] = $imageName;
        }

        $pl = PhanLoaiMonAn::create($data);

        return response()->json(['message' => 'Phân loại được thêm thành công!', 'phanloai' => $pl], 201);
    }

    public function update(Request $request, $id)
    {
        $pl = PhanLoaiMonAn::find($id);

        $validatedData = $request->validate([
            'pl_tenpl' => 'required|string|max:50',
            'pl_tenhinh' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('pl_tenhinh')) {
            // Xóa ảnh cũ
            if ($pl->pl_tenhinh && file_exists(public_path('../../frontend/public/anh_phan_loai/' . $pl->pl_tenhinh))) {
                unlink(public_path('../../frontend/public/anh_phan_loai/' . $pl->pl_tenhinh));
            }

            $image = $request->file('pl_tenhinh');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('../../frontend/public/anh_phan_loai'), $imageName);
            $validatedData['pl_tenhinh'] = $imageName;
        }

        $pl->update($validatedData);
        

        return response()->json(['message' => 'Cập nhật phân loại thành công!', 'phanloai' => $pl]);
    }

    public function destroy($id)
    {
        $pl = PhanLoaiMonAn::findOrFail($id);

        if (MonAn::where('pl_id', $id)->exists()) {
            return response()->json(['message' => 'Không thể xóa! Phân loại đã có món ăn'], 400);
        }

        if ($pl->pl_tenhinh && file_exists(public_path('../../frontend/public/anh_phan_loai/' . $pl->pl_tenhinh))) {
            unlink(public_path('../../frontend/public/anh_phan_loai/' . $pl->pl_tenhinh));
        }

        $pl->delete();

        return response()->json(['message' => 'Xóa phân loại thành công!']);
    }
}
