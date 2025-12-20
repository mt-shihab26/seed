<?php

namespace Database\Factories;

use App\Models\Folder;
use App\Models\User;
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
            'user_id' => User::inRandomOrder()->first()?->id,
            'folder_id' => Folder::inRandomOrder()->first()?->id,
            'title' => fake()->sentence(),
            'content' => fake()->paragraphs(3, true),
        ];
    }

    /**
     * Make the note favorite for the user.
     */
    public function favorited(): static
    {
        return $this->state(fn (array $attributes) => [
            'favorited_at' => now(),
        ]);
    }

    /**
     * Make the note archived for the user.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'archived_at' => now(),
        ]);
    }

    /**
     * Make the note deleted for the user.
     */
    public function deleted(): static
    {
        return $this->state(fn (array $attributes) => [
            'deleted_at' => now(),
        ]);
    }
}
