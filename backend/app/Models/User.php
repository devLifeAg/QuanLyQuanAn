<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'user'; // Tên bảng trong database
    protected $primaryKey = 'u_id'; // Khóa chính
    public $timestamps = false; // Không sử dụng timestamps

    protected $fillable = [
        'u_username',
        'u_pass',
        'u_role',
        'u_name'
    ];

    protected $hidden = [
        'u_pass', // Ẩn mật khẩu khi chuyển đổi sang mảng hoặc JSON
    ];

    // Đặt trường mật khẩu
    public function getAuthPassword()
    {
       return 'u_pass';
    }

    // Đặt trường tên đăng nhập
    public function getAuthIdentifierName()
    {
        return 'u_username';
    }

    public function dsKetCa()
    {
        return $this->hasMany(QuanLyKetCa::class, 'kc_id', 'kc_id'); //class, foreignkey, localkey
    }
    public function dsHoaDon()
    {
        return $this->hasMany(QuanLyHoaDon::class, 'ct_id', 'ct_id'); //class, foreignkey, localkey
    }
    

}
