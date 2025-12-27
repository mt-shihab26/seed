<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Features;

class SettingController extends Controller
{
    /**
     * Show the user's statistics settings page.
     */
    public function editNotes(Request $request)
    {
        return inertia('settings/notes', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the user's folders management page.
     */
    public function folders()
    {
        return inertia('settings/folders');
    }

    /**
     * Show the user's tags management page.
     */
    public function editTags(Request $request)
    {
        $tags = $request->user()->tags()->withCount('notes')->orderBy('name')->get();

        return inertia('settings/tags', [
            'tags' => $tags,
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function editProfile(Request $request)
    {
        return inertia('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function updateProfile(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('settings.profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroyProfile(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Show the user's password settings page.
     */
    public function editPassword()
    {
        return inertia('settings/password');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return back();
    }

    /**
     * Show the user's two-factor authentication settings page.
     */
    public function twoFactorShow(TwoFactorAuthenticationRequest $request)
    {
        $request->ensureStateIsValid();

        return inertia('settings/two-factor', [
            'twoFactorEnabled' => $request->user()->hasEnabledTwoFactorAuthentication(),
            'requiresConfirmation' => Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm'),
        ]);
    }

    /**
     * Show appearance settings page
     */
    public function editAppearance()
    {
        return inertia('settings/appearance');
    }
}
