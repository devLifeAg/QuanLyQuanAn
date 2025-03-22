<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ban;

class BanSeeder extends Seeder
{
    public function run()
    {
        Ban::insert([
            ['b_id' => 1, 'b_tenban' => 'Bàn 1', 'b_trangthai' => true, 't_id' => 1],
            ['b_id' => 2, 'b_tenban' => 'Bàn 2', 'b_trangthai' => true, 't_id' => 1],
            ['b_id' => 3, 'b_tenban' => 'Bàn 3', 'b_trangthai' => true, 't_id' => 2],
        ]);
    }
}

