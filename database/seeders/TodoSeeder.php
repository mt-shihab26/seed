<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Todo;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Todo::factory(10)->create()->each(function ($todo) {
            $todo->tags()->attach(
                Tag::inRandomOrder()->limit(rand(0, 3))->pluck('id')
            );
        });

        Todo::factory(5)->completed()->create()->each(function ($todo) {
            $todo->tags()->attach(
                Tag::inRandomOrder()->limit(rand(0, 2))->pluck('id')
            );
        });

        Todo::factory(3)->favorited()->create()->each(function ($todo) {
            $todo->tags()->attach(
                Tag::inRandomOrder()->limit(rand(1, 3))->pluck('id')
            );
        });

        Todo::factory(2)->archived()->create();
        Todo::factory(2)->deleted()->create();
    }
}
