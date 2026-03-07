@extends('layouts.app')

@section('content')

<x-header>
HISTORIAL
</x-header>

<div class="flex justify-center mt-16">

<div class="bg-blue-100 rounded-2xl shadow-lg p-10 w-[650px] grid grid-cols-2 gap-6">

@for ($i = 0; $i < 6; $i++)

<div class="flex items-center gap-4">

<div class="text-green-600 text-xl">
➡
</div>

<div>

<p class="font-semibold text-gray-700">
Entrada
</p>

<p class="text-sm text-gray-500">
19/02/2026 — 07:15 AM
</p>

</div>

<span class="ml-auto bg-green-300 text-green-800 text-xs px-3 py-1 rounded-full">
Permitido
</span>

</div>

@endfor

</div>

</div>

@endsection