@extends('layouts.app')

@section('content')

<x-header>
AJUSTES
</x-header>

<div class="flex flex-col items-center mt-16 space-y-8">

<div class="bg-blue-100 rounded-xl shadow p-6 w-96 flex justify-between">

<div>

<p class="font-semibold">
General
</p>

<p class="text-sm">
Idioma:
</p>

</div>

<select class="border rounded p-2">
<option>Español</option>
<option>English</option>
</select>

</div>

<div class="bg-blue-100 rounded-xl shadow p-6 w-96 flex justify-between">

<div>

<p class="font-semibold">
Accesibilidad
</p>

<p class="text-sm">
Tamaño de letra:
</p>

</div>

<select class="border rounded p-2">
<option>Normal</option>
<option>Grande</option>
</select>

</div>

</div>

@endsection