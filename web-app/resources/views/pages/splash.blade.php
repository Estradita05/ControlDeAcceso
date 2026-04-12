@extends('layouts.app')

@section('title', 'Bienvenido')

@section('content')
<div class="fixed inset-0 bg-darkbase flex items-center justify-center overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-96 h-96 bg-brand-500/10 rounded-full blur-2xl -top-48 -left-48 animate-pulse"></div>
        <div class="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-xl -bottom-48 -right-48 animate-pulse" style="animation-delay: 1s"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center">
        <div id="logo-container" class="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
            <img src="{{ asset('images/logo.png') }}" class="w-32 h-32 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]" alt="Logo">
        </div>
        
        <div id="text-container" class="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300">
            <h1 class="text-4xl font-extrabold text-white tracking-widest uppercase mb-4">
                Control de Acceso
            </h1>
            <div class="flex items-center justify-center gap-3">
                <div class="h-px w-12 bg-linear-to-r from-transparent to-brand-500"></div>
                <p class="text-brand-300 font-medium tracking-[0.3em] uppercase text-xs">Sistema Inteligente</p>
                <div class="h-px w-12 bg-linear-to-l from-transparent to-brand-500"></div>
            </div>
        </div>

        <!-- Loader -->
        <div id="loader" class="mt-16 opacity-0 transition-opacity duration-500 delay-700">
            <div class="flex gap-2">
                <div class="w-2 h-2 bg-brand-500 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Trigger animations
        setTimeout(() => {
            document.getElementById('logo-container').classList.remove('opacity-0', 'translate-y-8');
            document.getElementById('text-container').classList.remove('opacity-0', 'translate-y-8');
            document.getElementById('loader').classList.remove('opacity-0');
        }, 100);

        // Redirect after delay (4 seconds total)
        setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token) {
                window.location.href = "{{ route('menu') }}";
            } else {
                window.location.href = "{{ route('login') }}";
            }
        }, 4000);
    });
</script>
@endsection
