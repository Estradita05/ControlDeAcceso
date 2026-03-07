@extends('layouts.app')

@section('content')

<div class="flex flex-col items-center justify-center mt-20">

<img src="{{ asset('images/logo.png') }}" class="w-56 mb-8">

<div class="bg-gray-100 shadow-lg rounded-md p-10 w-96 text-center">

<h1 class="text-3xl font-bold text-gray-800 mb-4">
¡Bienvenido!
</h1>

<p class="text-gray-600 leading-relaxed mb-6">
Accesos seguros,<br>
comunidad protegida.
</p>

<a href="/login">

<button class="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-full transition duration-200">

Iniciar Sesión

</button>

</a>

</div>

</div>

@endsection