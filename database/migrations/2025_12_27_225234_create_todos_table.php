<?php

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
        Schema::create('todos', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('folder_id')->nullable()->constrained('folders')->cascadeOnDelete()->cascadeOnUpdate();

            $table->string('title');
            $table->text('description')->nullable();

            $table->timestamp('completed_at')->nullable();
            $table->timestamp('favorited_at')->nullable();
            $table->timestamp('archived_at')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('todo_tag', function (Blueprint $table) {
            $table->foreignUuid('todo_id')->constrained('todos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('tag_id')->constrained('tags')->cascadeOnDelete()->cascadeOnUpdate();

            $table->primary(['todo_id', 'tag_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_tag');
        Schema::dropIfExists('todos');
    }
};
