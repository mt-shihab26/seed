<?php

use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', fn () => inertia('welcome', ['canRegister' => Features::enabled(Features::registration())]))->name('home');

Route::prefix('/settings')->middleware('auth')->group(function () {
    Route::redirect('/', '/settings/profile')->name('settings.redirect');

    Route::get('/profile', [SettingController::class, 'editProfile'])->name('settings.profile.edit');
    Route::patch('/profile', [SettingController::class, 'updateProfile'])->name('settings.profile.update');
    Route::delete('/profile', [SettingController::class, 'destroyProfile'])->name('settings.profile.destroy');

    Route::get('/password', [SettingController::class, 'editPassword'])->name('settings.password.edit');
    Route::put('/password', [SettingController::class, 'updatePassword'])->middleware('throttle:6,1')->name('settings.password.update');

    Route::get('/two-factor', [SettingController::class, 'twoFactorShow'])->middleware('two-factor.password.confirm')->name('settings.two-factor.show');

    Route::get('/appearance', [SettingController::class, 'editAppearance'])->name('settings.appearance.edit');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
