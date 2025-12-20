<?php

namespace Database\Seeders;

use App\Models\Note;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Note::factory(5)->create();
        Note::factory(2)->favorited()->create();
        Note::factory(2)->archived()->create();
        Note::factory(2)->deleted()->create();
    }
}
