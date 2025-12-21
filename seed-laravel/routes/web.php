<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/notes')->name('home');
Route::redirect('/dashboard', '/notes')->name('dashboard');

Route::prefix('/settings')->middleware('auth')->group(function () {
    Route::redirect('/', '/settings/statistics')->name('settings.redirect');

    Route::get('/statistics', [SettingController::class, 'editStatistics'])->name('settings.statistics.edit');

    Route::get('/profile', [SettingController::class, 'editProfile'])->name('settings.profile.edit');
    Route::patch('/profile', [SettingController::class, 'updateProfile'])->name('settings.profile.update');
    Route::delete('/profile', [SettingController::class, 'destroyProfile'])->name('settings.profile.destroy');

    Route::get('/password', [SettingController::class, 'editPassword'])->name('settings.password.edit');
    Route::put('/password', [SettingController::class, 'updatePassword'])->middleware('throttle:6,1')->name('settings.password.update');

    Route::get('/two-factor', [SettingController::class, 'twoFactorShow'])->middleware('two-factor.password.confirm')->name('settings.two-factor.show');

    Route::get('/appearance', [SettingController::class, 'editAppearance'])->name('settings.appearance.edit');
});

Route::prefix('/notes')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [NoteController::class, 'index'])->name('notes.index');
    Route::get('/favorites', [NoteController::class, 'favorites'])->name('notes.favorites');
    Route::get('/archived', [NoteController::class, 'archived'])->name('notes.archived');
    Route::get('/trashed', [NoteController::class, 'trashed'])->name('notes.trashed');

    Route::get('/folders/{folder}', [NoteController::class, 'folders'])->name('notes.folders.show');
    Route::get('/tags/{tag}', [NoteController::class, 'tags'])->name('notes.tags.show');
});
