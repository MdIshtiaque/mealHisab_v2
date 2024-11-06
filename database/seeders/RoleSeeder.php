<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Enums\RoleEnums;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin role
        Role::create(['name' => RoleEnums::ADMIN->value, 'guard_name' => 'api']);

        // Create member role
        Role::create(['name' => RoleEnums::MEMBER->value, 'guard_name' => 'api']);
    }
}
