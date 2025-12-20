<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Build query notes with folder and tags
     */
    private function notesQuery(Request $request)
    {
        return $request->user()->notes()->with(['folder', 'tags']);
    }

    /**
     * Display a listing of the notes.
     */
    public function index(Request $request)
    {
        $notes = $this->notesQuery($request)->get();

        return inertia('notes/index', [
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the favorites notes.
     */
    public function favorites(Request $request)
    {
        $notes = $this->notesQuery($request)->whereNotNull('favorited_at')->get();

        return inertia('notes/index', [
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the archived notes.
     */
    public function archived(Request $request)
    {
        $notes = $this->notesQuery($request)->whereNotNull('archived_at')->get();

        return inertia('notes/index', [
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the trashed notes.
     */
    public function trashed(Request $request)
    {
        $notes = $this->notesQuery($request)->withTrashed()->get();

        return inertia('notes/index', [
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
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //
    }
}
