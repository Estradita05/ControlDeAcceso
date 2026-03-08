@extends('layouts.app')

@section('content')

<div class="flex flex-col items-center mt-16">

<img src="{{ asset('images/logo.png') }}" class="w-28 mb-4">

<div class="bg-blue-200 w-96 text-center py-2 text-xl font-semibold text-blue-900 rounded-t-md">
INICIAR SESIÓN
</div>

<div class="bg-gray-100 shadow-md w-96 p-8 rounded-b-md">

<form action="/menu" method="GET">

<p class="text-gray-600 mb-4">
Ingresa tus datos
</p>

<label class="text-sm text-gray-700">
Correo Electrónico
</label>

<input
type="email"
class="w-full mb-3 mt-1 p-2 rounded bg-blue-100 focus:outline-none"
/>

<label class="text-sm text-gray-700">
Contraseña
</label>

<input
type="password"
class="w-full mb-4 mt-1 p-2 rounded bg-blue-100 focus:outline-none"
/>

<a href="/reset" class="text-sm text-blue-800 hover:underline">
¿Olvidaste tu contraseña?
</a>

<div class="mt-4 text-center">

<button class="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full transition">

Iniciar Sesión

</button>

</div>

</form>

</div>

</div>

@endsection