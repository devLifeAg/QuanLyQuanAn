<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuanLyKetCa extends Model
{
    use HasFactory;

    protected $table = 'quanlyketca'; // Tên bảng trong database
    protected $primaryKey = 'kc_id'; // Khóa chính
    public $timestamps = false; // Không sử dụng timestamps

    protected $fillable = [
        'u_id',
        'kc_tongtien',
        'kc_sl_hd',
        'kc_ngaygio'
    ];

    /**
     * Quan hệ với bảng `user`
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'u_id', 'u_id');
    }
}
