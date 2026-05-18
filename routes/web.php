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

    /*
    |--------------------------------------------------------------------------
    | Membres
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,responsable')->group(function () {
        Route::get('/members/create', [MemberController::class, 'create'])->name('members.create');
        Route::post('/members', [MemberController::class, 'store'])->name('members.store');
        Route::get('/members/{member}/edit', [MemberController::class, 'edit'])->name('members.edit');
        Route::match(['put', 'patch'], '/members/{member}', [MemberController::class, 'update'])->name('members.update');
        Route::delete('/members/{member}', [MemberController::class, 'destroy'])->name('members.destroy');
    });

    Route::get('/members', [MemberController::class, 'index'])->name('members.index');
    Route::get('/members/{member}', [MemberController::class, 'show'])->name('members.show');

    /*
    |--------------------------------------------------------------------------
    | Projets de recherche
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,responsable')->group(function () {
        Route::get('/research-projects/create', [ResearchProjectController::class, 'create'])->name('research-projects.create');
        Route::post('/research-projects', [ResearchProjectController::class, 'store'])->name('research-projects.store');
        Route::get('/research-projects/{research_project}/edit', [ResearchProjectController::class, 'edit'])->name('research-projects.edit');
        Route::match(['put', 'patch'], '/research-projects/{research_project}', [ResearchProjectController::class, 'update'])->name('research-projects.update');
        Route::delete('/research-projects/{research_project}', [ResearchProjectController::class, 'destroy'])->name('research-projects.destroy');
    });

    Route::get('/research-projects', [ResearchProjectController::class, 'index'])->name('research-projects.index');
    Route::get('/research-projects/{research_project}', [ResearchProjectController::class, 'show'])->name('research-projects.show');

    /*
    |--------------------------------------------------------------------------
    | Equipements
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,responsable')->group(function () {
        Route::get('/equipments/create', [EquipmentController::class, 'create'])->name('equipments.create');
        Route::post('/equipments', [EquipmentController::class, 'store'])->name('equipments.store');
        Route::get('/equipments/{equipment}/edit', [EquipmentController::class, 'edit'])->name('equipments.edit');
        Route::match(['put', 'patch'], '/equipments/{equipment}', [EquipmentController::class, 'update'])->name('equipments.update');
        Route::delete('/equipments/{equipment}', [EquipmentController::class, 'destroy'])->name('equipments.destroy');
        Route::patch('/equipments/{equipment}/status', [EquipmentController::class, 'updateStatus'])->name('equipments.status');
    });

    Route::post('/equipments/{equipment}/reservations', [EquipmentController::class, 'storeReservation'])->name('equipments.reservations.store');
    Route::get('/equipments', [EquipmentController::class, 'index'])->name('equipments.index');
    Route::get('/equipments/{equipment}', [EquipmentController::class, 'show'])->name('equipments.show');

    /*
    |--------------------------------------------------------------------------
    | Publications
    |--------------------------------------------------------------------------
    */
    Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
    Route::get('/publications/create', [PublicationController::class, 'create'])->name('publications.create');
    Route::post('/publications', [PublicationController::class, 'store'])->name('publications.store');

    Route::middleware('role:admin,responsable,chercheur')->group(function () {
        Route::get('/publications/{publication}/edit', [PublicationController::class, 'edit'])->name('publications.edit');
        Route::match(['put', 'patch'], '/publications/{publication}', [PublicationController::class, 'update'])->name('publications.update');
        Route::delete('/publications/{publication}', [PublicationController::class, 'destroy'])->name('publications.destroy');
    });

    Route::post('/publications/{publication}/extract-keywords', [AiController::class, 'extractKeywords'])->name('publications.extract-keywords');
    Route::get('/publications/{publication}', [PublicationController::class, 'show'])->name('publications.show');

    /*
    |--------------------------------------------------------------------------
    | Valorisation
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,responsable')->group(function () {
        Route::get('/valorisations/create', [ValorisationController::class, 'create'])->name('valorisations.create');
        Route::post('/valorisations', [ValorisationController::class, 'store'])->name('valorisations.store');
        Route::get('/valorisations/{valorisation}/edit', [ValorisationController::class, 'edit'])->name('valorisations.edit');
        Route::match(['put', 'patch'], '/valorisations/{valorisation}', [ValorisationController::class, 'update'])->name('valorisations.update');
        Route::delete('/valorisations/{valorisation}', [ValorisationController::class, 'destroy'])->name('valorisations.destroy');
    });

    Route::get('/valorisations', [ValorisationController::class, 'index'])->name('valorisations.index');
    Route::get('/valorisations/{valorisation}', [ValorisationController::class, 'show'])->name('valorisations.show');

    /*
    |--------------------------------------------------------------------------
    | IA
    |--------------------------------------------------------------------------
    */
    Route::get('/ai/recommendations', [AiController::class, 'recommendations'])->name('ai.recommendations');
    Route::post('/ai/recommendations', [AiController::class, 'generateRecommendations'])->name('ai.recommendations.generate');
});
require __DIR__.'/auth.php';
