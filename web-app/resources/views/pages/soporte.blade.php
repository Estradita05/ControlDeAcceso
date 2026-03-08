@extends('layouts.app')

@section('content')

<x-header>
AYUDA Y SOPORTE
</x-header>

<div class="flex flex-col items-center mt-16 space-y-8">

<div class="bg-blue-100 rounded-xl shadow p-6 w-96 text-center">

<p class="font-semibold mb-3">
Preguntas Frecuentes
</p>

<ul class="text-sm text-gray-700 space-y-2">

<li>¿Qué hago si un visitante no aparece en la lista autorizada?</li>

<li>¿Cómo registro la entrada de un visitante en la aplicación?</li>

</ul>

</div>

<div class="text-center">

<p class="font-semibold">
Contactar Soporte
</p>

<p class="text-sm text-gray-600">
Si no encuentras lo que buscas, contáctanos directamente.
</p>

<button class="mt-3 bg-blue-800 text-white px-5 py-2 rounded-full">
Enviar un Mensaje
</button>

<p class="text-sm mt-3 text-gray-600">
soporte@controlacceso.com
</p>

</div>

</div>

@endsection