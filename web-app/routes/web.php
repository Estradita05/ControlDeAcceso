<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('pages.inicio'));
Route::get('/login', fn() => view('pages.login'));
Route::get('/menu', fn() => view('pages.menu'));
Route::get('/reset', fn() => view('pages.reset'));
Route::view('/historial','pages.historial');
Route::view('/perfil','pages.perfil');
Route::view('/ajustes','pages.ajustes');
Route::view('/soporte','pages.soporte');
Route::view('/editar-perfil','pages.editar-perfil');
Route::view('/menu','pages.menu');

Route::view('/historial','pages.historial');

Route::view('/vehiculos','pages.vehiculos');

Route::view('/perfil','pages.perfil');

Route::view('/soporte','pages.soporte');

Route::view('/ajustes','pages.ajustes');

Route::view('/editar-perfil','pages.editar-perfil');