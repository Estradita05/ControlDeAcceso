@extends('layouts.app')

@section('content')

<x-header>
MENÚ
</x-header>

<div class="flex flex-col items-center mt-16">

<div class="w-96 space-y-4">

<a href="/historial">

<div class="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition cursor-pointer">

<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/>
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22a10 10 0 100-20 10 10 0 000 20z"/>
</svg>

Historial de accesos

</div>

</a>

<a href="/vehiculos">

<div class="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition cursor-pointer">

<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path d="M3 13l1-3h16l1 3M5 13v5M19 13v5M5 18h14"/>
</svg>

Entradas de vehículos

</div>

</a>

<a href="/perfil">

<div class="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition cursor-pointer">

<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path d="M5.121 17.804A9 9 0 1118.879 6.196"/>
</svg>

Mi perfil

</div>

</a>

<a href="/soporte">

<div class="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition cursor-pointer">

<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.5 7.5 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
</svg>

Ayuda y soporte

</div>

</a>

<a href="/ajustes">

<div class="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition cursor-pointer">

<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path d="M11.983 13.983a2 2 0 100-4 2 2 0 000 4z"/>
</svg>

Ajustes

</div>

</a>

</div>

</div>

@endsection