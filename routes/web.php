<?php

use App\Http\Controllers\AiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\ResearchProjectController;
use App\Http\Controllers\ValorisationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('members', MemberController::class)->only(['index', 'show']);
    Route::resource('research-projects', ResearchProjectController::class)->only(['index', 'show']);
    Route::resource('equipments', EquipmentController::class)->only(['index', 'show']);
    Route::resource('publications', PublicationController::class)->only(['index', 'show', 'create', 'store']);
    Route::resource('valorisations', ValorisationController::class)->only(['index', 'show']);

    Route::middleware('role:admin,responsable')->group(function () {
        Route::resource('members', MemberController::class)->except(['index', 'show']);
        Route::resource('research-projects', ResearchProjectController::class)->except(['index', 'show']);
        Route::resource('equipments', EquipmentController::class)->except(['index', 'show']);
        Route::patch('/equipments/{equipment}/status', [EquipmentController::class, 'updateStatus'])->name('equipments.status');
        Route::resource('valorisations', ValorisationController::class)->except(['index', 'show']);
    });

    Route::post('/equipments/{equipment}/reservations', [EquipmentController::class, 'storeReservation'])->name('equipments.reservations.store');
    Route::resource('publications', PublicationController::class)->only(['edit', 'update', 'destroy'])->middleware('role:admin,responsable,chercheur');
    Route::post('/publications/{publication}/extract-keywords', [AiController::class, 'extractKeywords'])->name('publications.extract-keywords');

    Route::get('/ai/recommendations', [AiController::class, 'recommendations'])->name('ai.recommendations');
    Route::post('/ai/recommendations', [AiController::class, 'generateRecommendations'])->name('ai.recommendations.generate');
});

require __DIR__.'/auth.php';
