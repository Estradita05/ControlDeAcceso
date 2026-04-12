@extends('layouts.app')

@section('content')
<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img src="{{ asset('images/login-bg.png') }}" class="w-full h-full object-cover" alt="Background">
        <!-- Overlay to ensure text readability -->
        <div class="absolute inset-0 bg-brand-900/60 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
    </div>

    <!-- Glassmorphism Card -->
    <div class="relative z-10 w-full max-w-md p-8 mx-4">
        <div class="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-3xl overflow-hidden p-8 md:p-10 text-center">
            
            <a href="/login" class="inline-flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors text-sm font-medium mb-6 absolute top-8 left-8">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </a>

            <div class="pt-8 mb-6">
                <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Restablecer Contraseña</h2>
                <p class="text-blue-100/80 text-sm font-medium">Te ayudaremos a recuperar el acceso.</p>
            </div>

            <form action="" method="POST" class="space-y-5 text-left">
                
                <div>
                    <label class="text-sm font-medium text-blue-50 mb-1.5 ml-1 flex flex-col text-center">
                        Introduce tu correo electrónico o ID institucional:
                    </label>
                    <div class="relative mt-4">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-200">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Buscar usuario"
                            class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-blue-200/50 outline-none focus:bg-white/20 focus:border-brand-300 focus:ring-2 focus:ring-brand-300/50 transition-all duration-300 text-center"
                        />
                    </div>
                </div>

                <div class="pt-4">
                    <button class="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-brand-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                        Buscar
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
@endsection