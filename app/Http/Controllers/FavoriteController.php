<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of favorited notes and todos.
     */
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->withRelations()->onlyFavorited()->latest()->get();
        $todos = $request->user()->todos()->withRelations()->onlyFavorited()->latest()->get();

        return inertia('favorites/index', [
            'title' => 'Favorites',
            'notes' => $notes,
            'todos' => $todos,
        ]);
    }
}
