<?php

use App\Enums\Color;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();

            $table->string('name');
            $table->string('color')->default(Color::GRAY->value);

            $table->timestamps();
        });

        Schema::create('note_tag', function (Blueprint $table) {
            $table->foreignUuid('note_id')->constrained('notes')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('tag_id')->constrained('tags')->cascadeOnDelete()->cascadeOnUpdate();

            $table->primary(['note_id', 'tag_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('note_tag');
        Schema::dropIfExists('tags');
    }
};
