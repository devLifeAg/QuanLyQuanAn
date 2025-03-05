<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDon extends Model
{
    use HasFactory;

    protected $table = 'chitiethoadon'; // Tên bảng trong database
    protected $primaryKey = 'ct_id'; // Khóa chính
    public $timestamps = false; // Không sử dụng timestamps

    protected $fillable = [
        'mon_id',
        'ct_soluong',
        'ct_thanhtien'
    ];

    /**
     * Quan hệ với bảng MonAn (1 chi tiết hóa đơn thuộc về 1 món ăn)
     */
    public function monAn()
    {
        return $this->belongsTo(MonAn::class, 'mon_id', 'mon_id');
    }
    public function HoaDon()
    {
        return $this->belongsTo(QuanLyHoaDon::class, 'hd_id', 'hd_id');
    }
}
