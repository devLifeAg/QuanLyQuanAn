<?php

use App\Http\Controllers\QLBanController;
use App\Http\Controllers\QLMonController;
use App\Http\Controllers\QLPhanLoaiController;
use App\Http\Controllers\QLTangController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Tang;
use App\Models\Ban;
use App\Models\PhanLoaiMonAn;
use App\Models\MonAn;

// API đăng nhập
Route::post('/login', function (Request $request) {
    $username = $request->input('username');
    $password = $request->input('password');

    $user = User::where('u_username', $username)->first();

    if ($user && Hash::check($password, $user->u_pass)) {
        return response()->json([
            'result' => 1,
            'user' => [
                'u_id' => $user->u_id,
                'u_username' => $user->u_username,
                'u_name' => $user->u_name,
                'u_role' => $user->u_role,
            ]
        ]);
    } else {
        return response()->json(['result' => 0]);
    }
});

// API trả về danh sách tầng và bàn
Route::get('/danhsach-tang-ban', function () {
    $data = Tang::with('bans')->get();
    return response()->json([
        'result' => 1,
        'data' => $data
    ]);
});

// API trả về danh sách phân loại và món ăn
Route::get('/danhsach-phanloai-monan', function () {
    $data = PhanLoaiMonAn::with('monan')->get();
    return response()->json([
        'result' => 1,
        'data' => $data
    ]);
});

// API trả về danh sách món ăn
Route::get('/danhsach-monan', function () {
    $data = MonAn::all();
    return response()->json([
        'result' => 1,
        'data' => $data
    ]);
});


//QLMA
Route::post('/themmonan', [QLMonController::class, 'store']);
Route::put('/suamonan/{id}', [QLMonController::class, 'update']);
Route::delete('/xoamonan/{id}', [QLMonController::class, 'destroy']);
Route::put('/tatmomon/{id}', [QLMonController::class, 'tatMoMon']);

//QLPL
Route::post('/themphanloai', [QLPhanLoaiController::class, 'store']);
Route::put('/suaphanloai/{id}', [QLPhanLoaiController::class, 'update']);
Route::delete('/xoaphanloai/{id}', [QLPhanLoaiController::class, 'destroy']);

//QLTầng
Route::post('/themtang', [QLTangController::class, 'store']);
Route::put('/suatang/{id}', [QLTangController::class, 'update']);
Route::delete('/xoatang/{id}', [QLTangController::class, 'destroy']);
Route::put('/tatmotang/{id}', [QLTangController::class, 'tatMoTang']);

//QLBàn
Route::post('/themban', [QLBanController::class, 'store']);
Route::put('/suaban/{id}', [QLBanController::class, 'update']);
Route::delete('/xoaban/{id}', [QLBanController::class, 'destroy']);
Route::put('/tatmoban/{id}', [QLBanController::class, 'tatMoBan']);