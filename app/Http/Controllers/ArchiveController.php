<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArchiveController extends Controller
{
    /**
     * Display a listing of archived notes and todos.
     */
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyArchived()->latest()->get();
        $todos = $request->user()->todos()->withRelations()->onlyArchived()->latest()->get();

        return inertia('archives.index', [
            'title' => 'Archived',
            'notes' => $notes,
            'todos' => $todos,
        ]);
    }
}
