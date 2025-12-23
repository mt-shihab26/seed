<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $auth = [
            'user' => $request->user()?->load([
                'tags' => fn ($query) => $query->withCount('notes'),
                'folders' => fn ($query) => $query->withCount('notes'),
            ]),
            'counts' => [
                'notes.index' => $request->user()?->notes()->whereNull('archived_at')->count(),
                'notes.favorites' => $request->user()?->notes()->whereNotNull('favorited_at')->count(),
                'notes.archived' => $request->user()?->notes()->whereNotNull('archived_at')->count(),
                'notes.trashed' => $request->user()?->notes()->onlyTrashed()->count(),
            ],
        ];

        $flash = [
            'info' => $request->session()->get('info'),
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
        ];

        return [
            ...parent::share($request),
            'auth' => $auth,
            'flash' => $flash,
        ];
    }
}
