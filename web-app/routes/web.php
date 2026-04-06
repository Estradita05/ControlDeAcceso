<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AuthController;

// Rutas de autenticación
Route::get('/', function () {
    return view('pages.login');
})->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout'); // ← Esta es la ruta que falta

// Rutas protegidas (requieren autenticación)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('pages.inicio');
    })->name('dashboard');
    
    Route::resource('access', AccessController::class);
    Route::resource('users', UserController::class);
    Route::resource('reports', ReportController::class);
    Route::get('/search', [SearchController::class, 'index'])->name('search');
});