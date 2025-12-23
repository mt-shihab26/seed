<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
    /** @use HasFactory<\Database\Factories\NoteFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
        'folder_id',
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
            'favorited_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the note.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the folder that owns the note.
     */
    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    /**
     * The tags that belong to the note.
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
     * Scope a query to only include active (non-archived) notes.
     */
    public function scopeOnlyActive($query)
    {
        return $query->whereNull('archived_at');
    }

    /**
     * Scope a query to only include favorited notes.
     */
    public function scopeOnlyFavorited($query)
    {
        return $query->whereNotNull('favorited_at');
    }

    /**
     * Scope a query to only include archived notes.
     */
    public function scopeOnlyArchived($query)
    {
        return $query->whereNotNull('archived_at');
    }
}
