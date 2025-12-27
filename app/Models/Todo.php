<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    /** @use HasFactory<\Database\Factories\TodoFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'folder_id',
        'completed_at',
        'favorited_at',
        'archived_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
            'favorited_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the todo.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the folder that owns the todo.
     */
    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    /**
     * The tags that belong to the todo.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Scope a query to eager load common relationships.
     */
    public function scopeWithRelations($query)
    {
        return $query->with(['folder', 'tags']);
    }

    /**
     * Scope a query to only include active (non-archived) todos.
     */
    public function scopeOnlyActive($query)
    {
        return $query->whereNull('archived_at');
    }

    /**
     * Scope a query to only include favorited todos.
     */
    public function scopeOnlyFavorited($query)
    {
        return $query->whereNotNull('favorited_at');
    }

    /**
     * Scope a query to only include archived todos.
     */
    public function scopeOnlyArchived($query)
    {
        return $query->whereNotNull('archived_at');
    }

    /**
     * Scope a query to only include completed todos.
     */
    public function scopeOnlyCompleted($query)
    {
        return $query->whereNotNull('completed_at');
    }

    /**
     * Scope a query to only include incomplete todos.
     */
    public function scopeOnlyIncomplete($query)
    {
        return $query->whereNull('completed_at');
    }
}
