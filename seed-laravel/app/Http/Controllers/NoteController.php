<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the notes.
     */
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->with(['folder', 'tags'])->get();

        dd($notes);

        return inertia('notes/index', [
            'notes' => $notes,
        ]);
    }

    /**
     * Display a listing of the favorites notes.
     */
    public function favorites()
    {
        return inertia('notes/index');
    }

    /**
     * Display a listing of the archived notes.
     */
    public function archived()
    {
        return inertia('notes/index');
    }

    /**
     * Display a listing of the trashed notes.
     */
    public function trashed()
    {
        return inertia('notes/index');
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
