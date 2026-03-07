@extends('layouts.app')

@section('content')

<x-header>
Perfil
</x-header>

<div class="flex flex-col items-center mt-10">

<div class="text-6xl">
👤
</div>

<h2 class="mt-2 font-semibold">
Carlos Hernández
</h2>

<p class="text-gray-500 text-sm">
124050109@edu.mx
</p>

<a href="/editar-perfil">

<button class="mt-4 bg-blue-800 text-white px-5 py-2 rounded-full hover:bg-blue-900 transition">

Editar Perfil

</button>

</a>
<div class="bg-blue-100 rounded-xl shadow mt-8 p-6 w-80">

<p class="font-semibold mb-3">
Datos del usuario
</p>

<div class="text-sm space-y-2">

<p class="flex justify-between">
<span>Vigilante</span>
<span>124050136</span>
</p>

<p class="flex justify-between">
<span>Número</span>
<span>4425414521</span>
</p>

<p class="flex justify-between">
<span>Correo</span>
<span>124050109@edu.mx</span>
</p>

</div>

</div>

<a href="/login">

<button class="mt-6 bg-blue-900 text-white px-8 py-2 rounded-full hover:bg-blue-950 transition">

Cerrar sesión

</button>

</a>

</div>

@endsection