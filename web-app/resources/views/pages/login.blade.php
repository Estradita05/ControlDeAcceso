@extends('layouts.auth')

@section('title', 'Iniciar Sesión | Control de Acceso')

@section('content')

<div class="flex flex-col items-center transform transition-all duration-700 ease-in-out pb-10">
    <!-- Logo with Neon Pulse -->
    <div class="relative mb-10 group">
        <div class="absolute inset-0 bg-blue-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <img src="{{ asset('images/logo.png') }}" class="w-28 relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform duration-500">
    </div>

    <!-- Ultra Premium Glassmorphism Card -->
    <div class="w-full bg-[#0d1326]/60 backdrop-blur-2xl border border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden relative">
        
        <!-- Top Highlight -->
        <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <!-- Header -->
        <div class="pt-8 pb-4 text-center px-8 relative">
            <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-300 tracking-tight">
                Acceso Sistema
            </h2>
            <p class="text-slate-400 mt-2 text-sm font-medium">Control de Acceso Avanzado</p>
        </div>

        <div class="px-8 pb-8 pt-2">
            <form action="{{ route('login.submit') }}" method="POST">
                @csrf
                
                <!-- Email Input -->
                <div class="mb-5 relative group">
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-blue-400">
                        Correo Institucional
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="usuario@institucion.edu"
                            class="w-full pl-11 pr-4 py-3.5 bg-[#080c17]/80 border border-white/5 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner"
                            required
                        />
                    </div>
                    @error('email')
                        <p class="text-red-400 text-xs mt-2 font-medium">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password Input -->
                <div class="mb-6 relative group">
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-blue-400">
                        Contraseña
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            class="w-full pl-11 pr-4 py-3.5 bg-[#080c17]/80 border border-white/5 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner"
                            required
                        />
                    </div>
                </div>

                <!-- Options -->
                <div class="flex justify-between items-center mb-8">
                    <label class="flex items-center text-sm text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                        <input type="checkbox" class="mr-2 rounded-md border-white/10 text-blue-500 bg-[#080c17] focus:ring-offset-0 focus:ring-blue-500/30 w-4 h-4 transition-all">
                        Recordarme
                    </label>
                    <a href="/reset" class="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline transition-all">
                        ¿Problemas?
                    </a>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 border border-blue-500/50">
                    <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10 flex items-center justify-center gap-2 text-[15px] tracking-wide">
                        INICIAR SESIÓN
                        <svg class="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </span>
                </button>

            </form>
        </div>
    </div>
</div>

@endsection