<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Folder $folder)
    {
        Gate::allowIf(fn (User $user) => $folder->user_id === $user->id);

        $notes = $folder->notes()->with(['folder', 'tags'])->where('folder_id', $folder->id)->get();

        return inertia('notes/index', [
            'title' => "Notes filter by '{$folder->name}' folder",
            'notes' => $notes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Folder $folder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Folder $folder)
    {
        //
    }
}
