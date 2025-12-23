<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoteController extends Controller
{
    /**
     * Display a listing of the notes.
     */
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyActive()->get();

        return inertia('notes/index', [
            'title' => 'All Notes',
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the favorites notes.
     */
    public function favorites(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyFavorited()->get();

        return inertia('notes/index', [
            'title' => 'Favorites Notes',
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the archived notes.
     */
    public function archived(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyArchived()->get();

        return inertia('notes/index', [
            'title' => 'Archived Notes',
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the trashed notes.
     */
    public function trashed(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyTrashed()->get();

        return inertia('notes/index', [
            'title' => 'Trashed Notes',
            'notes' => $notes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return inertia('notes/create', [
            'folders' => $request->user()->folders,
            'tags' => $request->user()->tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'folder_id' => ['required', 'exists:folders,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $note = $request->user()->notes()->create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'folder_id' => $validated['folder_id'],
        ]);

        if (isset($validated['tags'])) {
            $note->tags()->sync($validated['tags']);
        }

        return redirect()->route('notes.index')->with('success', 'Note created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        $note->load(['folder', 'tags']);

        return inertia('notes/edit', [
            'note' => $note,
            'folders' => $request->user()->folders,
            'tags' => $request->user()->tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'folder_id' => ['required', 'exists:folders,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $note->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'folder_id' => $validated['folder_id'],
        ]);

        if (isset($validated['tags'])) {
            $note->tags()->sync($validated['tags']);
        }

        return redirect()->route('notes.index')->with('success', 'Note updated successfully');
    }

    /**
     * Toggle the favorite status of the note.
     */
    public function toggleFavorite(Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        $note->update([
            'favorited_at' => $note->favorited_at ? null : now(),
        ]);

        return redirect()->back();
    }

    /**
     * Toggle the archive status of the note.
     */
    public function toggleArchive(Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        $note->update([
            'archived_at' => $note->archived_at ? null : now(),
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        $note->delete();

        return redirect()->back()->with('success', 'Notes deleted successfully');
    }
}
