<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\RoleEnums;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@meal.com',
            'phone' => '01797734294',
            'password' => bcrypt('password'),
        ]);

        $admin->assignRole(RoleEnums::ADMIN->value);

        for ($i = 0; $i < 10; $i++) {
            User::factory()
                ->create([
                    'name' => fake()->name(),
                    'email' => 'member' . $i . '@meal.com',
                    'phone' => "0179736545" . $i,
                    'password' => bcrypt('password'),
                ])->assignRole(RoleEnums::MEMBER->value);
        }
    }
}
