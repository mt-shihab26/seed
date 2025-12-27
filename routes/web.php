<?php

use App\Http\Controllers\FolderController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/notes')->name('home');
Route::redirect('/dashboard', '/notes')->name('dashboard');

Route::prefix('/settings')->middleware('auth')->group(function () {
    Route::get('/', fn () => redirect()->route('settings.profile.edit'))->name('settings.redirect');

    Route::get('/folders', [SettingController::class, 'folders'])->name('settings.folders.show');
    Route::get('/tags', [SettingController::class, 'tags'])->name('settings.tags.show');

    Route::get('/profile', [SettingController::class, 'editProfile'])->name('settings.profile.edit');
    Route::patch('/profile', [SettingController::class, 'updateProfile'])->name('settings.profile.update');
    Route::delete('/profile', [SettingController::class, 'destroyProfile'])->name('settings.profile.destroy');

    Route::get('/password', [SettingController::class, 'editPassword'])->name('settings.password.edit');
    Route::patch('/password', [SettingController::class, 'updatePassword'])->middleware('throttle:6,1')->name('settings.password.update');

    Route::get('/two-factor', [SettingController::class, 'twoFactor'])->middleware('two-factor.password.confirm')->name('settings.two-factor.show');

    Route::get('/appearance', [SettingController::class, 'appearance'])->name('settings.appearance.edit');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/notes')->group(function () {
        Route::get('/', [NoteController::class, 'index'])->name('notes.index');
        Route::get('/favorites', [NoteController::class, 'favorites'])->name('notes.favorites');
        Route::get('/archived', [NoteController::class, 'archived'])->name('notes.archived');
        Route::get('/trashed', [NoteController::class, 'trashed'])->name('notes.trashed');

        Route::get('/create', [NoteController::class, 'create'])->name('notes.create');
        Route::post('/', [NoteController::class, 'store'])->name('notes.store');

        Route::get('/{note}', [NoteController::class, 'show'])->name('notes.show');
        Route::get('/{note}/edit', [NoteController::class, 'edit'])->name('notes.edit');
        Route::patch('/{note}', [NoteController::class, 'update'])->name('notes.update');

        Route::patch('/{note}/toggle-favorite', [NoteController::class, 'toggleFavorite'])->name('notes.toggle-favorite');
        Route::patch('/{note}/toggle-archive', [NoteController::class, 'toggleArchive'])->name('notes.toggle-archive');

        Route::delete('/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
    });

    Route::prefix('/folders')->group(function () {
        Route::post('/', [FolderController::class, 'store'])->name('folders.store');
        Route::get('/{folder}', [FolderController::class, 'show'])->name('folders.show');
        Route::patch('/{folder}', [FolderController::class, 'update'])->name('folders.update');
        Route::delete('/{folder}', [FolderController::class, 'destroy'])->name('folders.destroy');
    });

    Route::prefix('/tags')->group(function () {
        Route::post('/', [TagController::class, 'store'])->name('tags.store');
        Route::get('/{tag}', [TagController::class, 'show'])->name('tags.show');
        Route::patch('/{tag}', [TagController::class, 'update'])->name('tags.update');
        Route::delete('/{tag}', [TagController::class, 'destroy'])->name('tags.destroy');
    });
});
