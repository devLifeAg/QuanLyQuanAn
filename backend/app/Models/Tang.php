<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tang extends Model
{

    protected $table = 'tang';
    public $timestamps = false;
    protected $primaryKey = 't_id';

    protected $fillable = [
        't_tentang',
        't_trangthai',
    ];

    public function danhSachBan()
    {
        return $this->hasMany(Ban::class, 'b_id', 'b_id'); //class, foreignkey, localkey
    }
}
