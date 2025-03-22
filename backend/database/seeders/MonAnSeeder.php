<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MonAn;

class MonAnSeeder extends Seeder
{
    public function run()
    {
        MonAn::insert([
            ['mon_id' => 1, 'pl_id' => 1, 'mon_tenmon' => 'Cơm chiên', 'mon_giamon' => 35000, 'mon_mota' => 'Cơm chiên thập cẩm', 'mon_hinhmon' => 'comchien.jpg', 'mon_trangthai' => true],
            ['mon_id' => 2, 'pl_id' => 2, 'mon_tenmon' => 'Chè đậu xanh', 'mon_giamon' => 20000, 'mon_mota' => 'Chè ngọt mát', 'mon_hinhmon' => 'che.jpg', 'mon_trangthai' => true],
        ]);
    }
}

