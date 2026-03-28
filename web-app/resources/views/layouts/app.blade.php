<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>Control de Acceso</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    
    <!-- Header solo para usuarios autenticados -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <a href="{{ route('dashboard') }}" class="flex items-center gap-3 hover:opacity-80 transition">
                <img src="{{ asset('images/logo.svg') }}" class="h-8" alt="Logo">
                <span class="font-semibold text-lg text-gray-900">Control de Acceso</span>
            </a>

            <nav class="hidden md:flex gap-1 items-center">
                <a href="{{ route('dashboard') }}" class="{{ Request::routeIs('dashboard*') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:bg-gray-100' }} px-3 py-2 rounded-md transition">Dashboard</a>
                <a href="{{ route('access.index') }}" class="{{ Request::routeIs('access.*') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:bg-gray-100' }} px-3 py-2 rounded-md transition">Accesos</a>
                <a href="{{ route('users.index') }}" class="{{ Request::routeIs('users.*') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:bg-gray-100' }} px-3 py-2 rounded-md transition">Usuarios</a>
                <a href="{{ route('reports.index') }}" class="{{ Request::routeIs('reports.*') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:bg-gray-100' }} px-3 py-2 rounded-md transition">Reportes</a>
            </nav>

            <div class="flex items-center gap-3">
                <form action="{{ route('search') }}" method="GET" class="hidden sm:flex">
                    <input name="q" value="{{ request('q') }}" class="border border-gray-300 rounded-lg px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Buscar...">
                </form>
                <div class="relative">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="rounded-lg px-3 py-2 bg-gray-100 hover:bg-gray-200 transition font-medium">
                            {{ auth()->user()->name ?? 'Cuenta' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Contenido principal -->
    <main>
        @yield('content')
    </main>
    
</body>
</html>