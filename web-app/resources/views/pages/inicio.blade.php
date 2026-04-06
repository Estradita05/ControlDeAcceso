@extends('layouts.app')

@section('content')
<div class="relative min-h-screen flex flex-col overflow-hidden">
    <!-- Navbar / Header -->
    <header class="relative z-20 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <div class="flex items-center gap-3">
            <img src="{{ asset('images/logo.png') }}" class="h-10 w-auto text-white drop-shadow-md brightness-0 invert" alt="Logo">
            <span class="text-2xl font-bold tracking-tight text-white drop-shadow-md">TIID</span>
        </div>
        <a href="/login" class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 hover:border-white/40 shadow shadow-black/10 px-5 py-2.5 rounded-full font-medium transition-all duration-300">
            Acceso a Personal
        </a>
    </header>

    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img src="{{ asset('images/login-bg.png') }}" class="w-full h-full object-cover" alt="Background">
        <div class="absolute inset-0 bg-brand-900/40 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 flex-1 flex items-center justify-center -mt-10">
        <div class="text-center px-4 max-w-3xl mx-auto">
            
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-8 backdrop-blur-md shadow-lg">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sistema Online v2.4
            </div>

            <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-xl">
                Plataforma de <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-blue-200">Control de Accesos</span>
            </h1>
            
            <p class="text-lg text-blue-100/90 leading-relaxed mb-10 max-w-2xl mx-auto px-4 font-medium drop-shadow-md">
                Solución integral y segura para la administración de entradas peatonales y vehiculares. Garantizando espacios seguros e identidades verificadas.
            </p>

            <a href="/login" class="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-xl shadow-lg shadow-brand-500/40 font-bold text-lg transform hover:-translate-y-1 transition-all duration-300 ring-1 ring-brand-400">
                Ingresar al Portal
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
            
        </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-6 text-center text-slate-400 text-sm bg-slate-900/50 backdrop-blur-sm border-t border-white/10">
        &copy; 2026 Tecnologías de la Información. Todos los derechos reservados.
    </footer>
</div>
@endsection