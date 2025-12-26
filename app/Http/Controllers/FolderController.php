<?php

namespace App\Http\Controllers;

use App\Enums\Color;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class FolderController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', Rule::enum(Color::class)],
        ]);

        $request->user()->folders()->create($validated);

        return redirect()->back()->with('success', 'Folder created successfully');
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, Folder $folder)
    {
        Gate::allowIf(fn (User $user) => $folder->user_id === $user->id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', Rule::enum(Color::class)],
        ]);

        $folder->update($validated);

        return redirect()->back()->with('success', 'Folder updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Folder $folder)
    {
        Gate::allowIf(fn (User $user) => $folder->user_id === $user->id);

        if ($folder->notes()->count() > 0) {
            return redirect()->back()->with('info', 'Cannot delete folder with existing notes. Please move or delete the notes first.');
        }

        $folder->delete();

        return redirect()->back()->with('success', 'Folder deleted successfully');
    }
}
