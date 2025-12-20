<?php

use App\Http\Controllers\SettingController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', fn () => inertia('welcome', ['canRegister' => Features::enabled(Features::registration())]))->name('home');

Route::prefix('/settings')->middleware('auth')->group(function () {
    Route::redirect('/', '/settings/profile');

    Route::get('/profile', [SettingController::class, 'editProfile'])->name('profile.edit');
    Route::patch('/profile', [SettingController::class, 'updateProfile'])->name('profile.update');
    Route::delete('/profile', [SettingController::class, 'destroyProfile'])->name('profile.destroy');

    Route::get('/password', [SettingController::class, 'editPassword'])->name('user-password.edit');
    Route::put('/password', [SettingController::class, 'updatePassword'])->middleware('throttle:6,1')->name('user-password.update');

    Route::get('two-factor', [TwoFactorAuthenticationController::class, 'twoFactorShow'])->name('two-factor.show');

    Route::get('/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
