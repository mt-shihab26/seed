<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TagController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        Gate::allowIf(fn (User $user) => $tag->user_id === $user->id);

        $notes = $tag->notes()->with(['folder', 'tags'])->get();

        return inertia('notes/index', [
            'title' => "Notes filter by '{$tag->name}' tag",
            'notes' => $notes,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        Gate::allowIf(fn (User $user) => $tag->user_id === $user->id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $tag->update($validated);

        return redirect()->back()->with('success', 'Tag updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        Gate::allowIf(fn (User $user) => $tag->user_id === $user->id);

        if ($tag->notes()->count() > 0) {
            return redirect()->back()->with('info', 'Cannot delete tag with existing notes. Please remove the tag from notes first.');
        }

        $tag->delete();

        return redirect()->back()->with('success', 'Tag deleted successfully');
    }
}
