<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PhanLoaiMonAn;

class PhanLoaiMonAnSeeder extends Seeder
{
    public function run()
    {
        PhanLoaiMonAn::insert([
            ['pl_id' => 1, 'pl_tenpl' => 'Món chính', 'pl_tenhinh' => 'monchinh.jpg'],
            ['pl_id' => 2, 'pl_tenpl' => 'Món tráng miệng', 'pl_tenhinh' => 'trangmieng.jpg'],
        ]);
    }
}

