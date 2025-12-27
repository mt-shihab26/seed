<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrashController extends Controller
{
    /**
     * Display a listing of trashed notes and todos.
     */
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyTrashed()->latest()->get();
        $todos = $request->user()->todos()->withRelations()->onlyTrashed()->latest()->get();

        return inertia('trashs.index', [
            'title' => 'Trash',
            'notes' => $notes,
            'todos' => $todos,
        ]);
    }
}
