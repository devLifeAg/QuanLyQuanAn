<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonAn extends Model
{
    use HasFactory;

    protected $table = 'monan'; // Tên bảng trong database
    protected $primaryKey = 'mon_id'; // Khóa chính
    public $timestamps = false; // Không sử dụng timestamps (created_at, updated_at)

    protected $fillable = [
        'pl_id',
        'mon_tenmon',
        'mon_giamon',
        'mon_mota',
        'mon_hinhmon',
        'mon_trangthai'
    ];

    /**
     * Quan hệ với bảng PhanLoaiMonAn (1 món ăn thuộc 1 loại)
     */
    public function phanLoai()
    {
        return $this->belongsTo(PhanLoaiMonAn::class, 'pl_id', 'pl_id');
    }
}
