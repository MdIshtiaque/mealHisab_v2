<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $group = Group::create([
            'name' => 'Happy Home',
            'description' => 'This is a group for a happy home',
            'members_count' => 4,
            'is_active' => true,
        ]);


        $group->members()->create(['user_id' => 2]);
        $group->members()->create(['user_id' => 3]);
        $group->members()->create(['user_id' => 4]);
        $group->members()->create(['user_id' => 5]);
        $group->members()->create(['user_id' => 6]);

        $group2 = Group::create([
            'name' => 'Busy Life',
            'description' => 'This is a group for a busy life',
            'members_count' => 2,
            'is_active' => true,
        ]);

        $group2->members()->create(['user_id' => 7]);
        $group2->members()->create(['user_id' => 8]);
    }
}
