<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TodoController extends Controller
{
    /**
     * Display a listing of the todos.
     */
    public function index(Request $request)
    {
        $todos = $request->user()->todos()->withRelations()->onlyActive()->latest()->get();

        return inertia('todos/index', [
            'title' => 'All Todos',
            'todos' => $todos,
        ]);
    }

    /**
     * Display a listing of the favorites todos.
     */
    public function favorites(Request $request)
    {
        $todos = $request->user()->todos()->withRelations()->onlyFavorited()->latest()->get();

        return inertia('todos/index', [
            'title' => 'Favorites Todos',
            'todos' => $todos,
            'back' => route('todos.index'),
        ]);
    }

    /**
     * Display a listing of the archived todos.
     */
    public function archived(Request $request)
    {
        $todos = $request->user()->todos()->withRelations()->onlyArchived()->latest()->get();

        return inertia('todos/index', [
            'title' => 'Archived Todos',
            'todos' => $todos,
            'back' => route('todos.index'),
        ]);
    }

    /**
     * Display a listing of the completed todos.
     */
    public function completed(Request $request)
    {
        $todos = $request->user()->todos()->withRelations()->onlyCompleted()->latest()->get();

        return inertia('todos/index', [
            'title' => 'Completed Todos',
            'todos' => $todos,
            'back' => route('todos.index'),
        ]);
    }

    /**
     * Display a listing of the trashed todos.
     */
    public function trashed(Request $request)
    {
        $todos = $request->user()->todos()->withRelations()->onlyTrashed()->latest()->get();

        return inertia('todos/index', [
            'title' => 'Trashed Todos',
            'todos' => $todos,
            'back' => route('todos.index'),
        ]);
    }

    /**
     * Display the specified todo.
     */
    public function show(Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $todo->load(['folder', 'tags']);

        return inertia('todos/show', [
            'todo' => $todo,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('todos/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'folder_id' => ['nullable', 'exists:folders,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $todo = $request->user()->todos()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'folder_id' => $validated['folder_id'],
        ]);

        if (isset($validated['tags'])) {
            $todo->tags()->sync($validated['tags']);
        }

        return redirect()->route('todos.index')->with('success', 'Todo created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $todo->load(['folder', 'tags']);

        return inertia('todos/edit', [
            'todo' => $todo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'folder_id' => ['nullable', 'exists:folders,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $todo->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'folder_id' => $validated['folder_id'],
        ]);

        if (isset($validated['tags'])) {
            $todo->tags()->sync($validated['tags']);
        }

        return redirect()->back()->with('success', 'Todo updated successfully');
    }

    /**
     * Toggle the complete status of the todo.
     */
    public function toggleComplete(Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $todo->update([
            'completed_at' => $todo->completed_at ? null : now(),
        ]);

        return redirect()->back();
    }

    /**
     * Toggle the favorite status of the todo.
     */
    public function toggleFavorite(Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $todo->update([
            'favorited_at' => $todo->favorited_at ? null : now(),
        ]);

        return redirect()->back();
    }

    /**
     * Toggle the archive status of the todo.
     */
    public function toggleArchive(Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $todo->update([
            'archived_at' => $todo->archived_at ? null : now(),
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        Gate::allowIf(fn (User $user) => $todo->user_id === $user->id);

        $todo->delete();

        return redirect()->back()->with('success', 'Todo deleted successfully');
    }
}
