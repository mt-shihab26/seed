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
        $notes = $request->user()->notes()->with(['folder', 'tags'])->get();

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
        $notes = $request->user()->notes()->with(['folder', 'tags'])->whereNotNull('favorited_at')->get();

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
        $notes = $request->user()->notes()->with(['folder', 'tags'])->whereNotNull('archived_at')->get();

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
        $notes = $request->user()->notes()->with(['folder', 'tags'])->onlyTrashed()->get();

        return inertia('notes/index', [
            'title' => 'Trashed Notes',
            'notes' => $notes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        return inertia('notes/edit', [
            'note' => $note,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $note->user_id === $user->id);

        //
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
