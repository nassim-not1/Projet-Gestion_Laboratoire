<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Ayoub El Youbi Ben Ameur',
                'email' => 'admin@example.com',
                'role' => 'admin',
            ],
            [
                'name' => 'Pr. Salma Benali',
                'email' => 'responsable@example.com',
                'role' => 'responsable',
            ],
            [
                'name' => 'Yassine Idrissi',
                'email' => 'chercheur@example.com',
                'role' => 'chercheur',
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    ...$user,
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                ],
            );
        }
    }
}
