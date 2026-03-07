@extends('layouts.app')

@section('content')

<x-header>
EDITAR PERFIL
</x-header>

<div class="flex flex-col items-center mt-10">

<div class="text-6xl mb-4">
👤
</div>

<h3 class="font-semibold mb-6">
Cambiar foto de perfil
</h3>

<div class="w-96 space-y-4">

<input class="w-full p-2 border rounded" placeholder="Nombre">

<input class="w-full p-2 border rounded" placeholder="Correo electrónico">

<p class="font-semibold mt-6">
Cambiar contraseña
</p>

<input class="w-full p-2 border rounded" placeholder="Contraseña Actual">

<input class="w-full p-2 border rounded" placeholder="Nueva Contraseña">

<input class="w-full p-2 border rounded" placeholder="Confirmar Contraseña">

</div>

<button class="mt-8 bg-blue-900 text-white px-8 py-2 rounded-lg">
Guardar cambios
</button>

</div>

@endsection