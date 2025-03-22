<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuanLyHoaDon extends Model
{
    use HasFactory;

    protected $table = 'quanlyhoadon'; // Tên bảng
    protected $primaryKey = 'hd_id'; // Khóa chính
    public $timestamps = false; // Không sử dụng timestamps

    protected $fillable = [
        'hd_ngaygio',
        'hd_tongtien',
        'hd_pttt',
        'hd_daThanhToan',
        'b_id',
        'u_id',
    ];

    /**
     * Quan hệ với bảng `ban`
     */
    public function ban()
    {
        return $this->belongsTo(Ban::class, 'b_id', 'b_id');
    }

    /**
     * Quan hệ với bảng `user`
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'u_id', 'u_id');
    }

    // /**
    //  * Quan hệ với bảng `quanlyketca`
    //  */
    // public function quanLyKetCa()
    // {
    //     return $this->belongsTo(QuanLyKetCa::class, 'kc_id', 'kc_id');
    // }

    public function dsChiTietHoaDon()
    {
        return $this->hasMany(ChiTietHoaDon::class, 'hd_id', 'hd_id');
    }
}
