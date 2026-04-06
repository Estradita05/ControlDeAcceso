@extends('layouts.dashboard')

@section('title', 'Mi Perfil')

@section('content')
<div class="max-w-4xl mx-auto">

    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-8">
        
        <!-- Cover Photo area -->
        <div class="h-32 bg-gradient-to-r from-brand-500 to-brand-700 w-full relative">
            <button class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-sm font-medium transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cambiar Portada
            </button>
        </div>

        <div class="px-8 pb-8">
            <!-- Avatar Header -->
            <div class="relative flex justify-between items-end -mt-12 mb-8">
                <div class="flex items-end gap-6">
                    <div class="w-28 h-28 rounded-2xl bg-white p-1.5 shadow-lg relative">
                        <div class="w-full h-full bg-brand-100 rounded-xl flex items-center justify-center text-4xl text-brand-600 font-bold">
                            CH
                        </div>
                        <div class="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                    <div class="pb-2">
                        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Carlos Hernández</h2>
                        <p class="text-brand-600 font-medium">Vigilante / Administrador</p>
                    </div>
                </div>

                <div class="pb-2 flex gap-3">
                    <a href="/editar-perfil" class="px-5 py-2.5 bg-brand-50 text-brand-700 hover:bg-brand-100 font-medium rounded-xl flex items-center gap-2 transition">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar Perfil
                    </a>
                </div>
            </div>

            <!-- User Info Grid -->
            <h3 class="text-lg font-bold text-slate-800 mb-4">Información Personal</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                
                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">ID de Usuario</span>
                    <span class="block text-slate-800 font-semibold font-mono">124050136</span>
                </div>

                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">Correo Electrónico</span>
                    <span class="block text-slate-800 font-medium">124050109@edu.mx</span>
                </div>

                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">Teléfono Móvil</span>
                    <span class="block text-slate-800 font-medium">+52 442 541 4521</span>
                </div>

                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">Departamento</span>
                    <span class="block text-slate-800 font-medium">Seguridad y Accesos</span>
                </div>

                <div class="md:col-span-2 pt-4 border-t border-slate-200/60 flex justify-between items-center">
                    <div>
                        <span class="block text-sm font-medium text-slate-500">Última conexión</span>
                        <span class="block text-sm text-slate-700">Hoy, a las 08:30 AM (IP: 192.168.1.45)</span>
                    </div>
                </div>

            </div>

        </div>

    </div>

</div>
@endsection