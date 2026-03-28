@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Bienvenido, {{ auth()->user()->name ?? 'Usuario' }}!</h1>
        <p class="text-gray-600">Sistema de Control de Acceso</p>
    </div>
</div>
@endsection