<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $usernames = ['admin', 'quanly', 'thu ngan', 'nhanvien','daubep'];
        // Lặp qua danh sách user để tạo tài khoản
        foreach ($usernames as $key => $username) {
            User::create([
                'u_username' => $username,
                'u_pass' => Hash::make($username),
                'u_role' => $key,
                'u_name' => $username,
            ]);
        }
        $this->call([
            TangSeeder::class,
            BanSeeder::class,
            PhanLoaiMonAnSeeder::class,
            MonAnSeeder::class,
        ]);
    }

}
