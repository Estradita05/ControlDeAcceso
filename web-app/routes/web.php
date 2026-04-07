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
Route::get('/logout', [AuthController::class, 'logout'])->name('logout'); // Ahora permite GET para cerrar sesión

// Rutas protegidas (requieren autenticación)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('pages.menu');
    })->name('dashboard');

    Route::get('/menu', function () {
        return view('pages.menu');
    })->name('menu');
    
    Route::get('/historial', function () {
        return view('pages.historial');
    })->name('historial');

    Route::get('/vehiculos', function () {
        return view('pages.vehiculos');
    })->name('vehiculos');

    Route::get('/perfil', function () {
        return view('pages.perfil');
    })->name('perfil');

    Route::get('/ajustes', function () {
        return view('pages.ajustes');
    })->name('ajustes');

    Route::get('/soporte', function () {
        return view('pages.soporte');
    })->name('soporte');
    
    Route::resource('access', AccessController::class);
    Route::resource('users', UserController::class);
    Route::resource('reports', ReportController::class);
    Route::get('/search', [SearchController::class, 'index'])->name('search');
});