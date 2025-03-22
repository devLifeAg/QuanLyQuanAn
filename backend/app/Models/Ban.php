<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ban extends Model
{

    protected $table = 'ban';
    public $timestamps = false;
    protected $primaryKey = 'b_id';

    protected $fillable = [
        'b_tenban',
        'b_trangthai',
        't_id',
    ];

    // (tùy chọn) Nếu cần dùng quan hệ ngược
    public function tang()
    {
        return $this->belongsTo(Tang::class, 't_id', 't_id');
    }
}
