<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::factory(10)->create();

        $notes = Note::all();
        $tags = Tag::all();

        $notes->each(function ($note) use ($tags) {
            $note->tags()->attach($tags->random(rand(1, 3)));
        });
    }
}
