<?php

namespace Database\Factories;

use App\Models\Folder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'folder_id' => Folder::inRandomOrder()?->first()?->id,
            'title' => fake()->title(),
            'content' => fake()->text(),
            'favorited' => fake()->boolean(25),
            'archived' => fake()->boolean(25),
        ];
    }

    /**
     * Make the note favorite for the user.
     */
    public function favorited(): static
    {
        return $this->state(fn (array $attributes) => [
            'favorited' => true,
        ]);
    }

    /**
     * Make the note archived for the user.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'favorited' => true,
        ]);
    }

    /**
     * Make the note archived for the user.
     */
    public function deleted(): static
    {
        return $this->state(fn (array $attributes) => [
            'deleted_at' => now(),
        ]);
    }
}
