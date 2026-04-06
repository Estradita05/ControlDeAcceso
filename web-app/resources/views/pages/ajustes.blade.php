@extends('layouts.dashboard')

@section('title', 'Ajustes')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">

    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-slate-100">
            <h2 class="text-xl font-bold text-slate-800">General</h2>
            <p class="text-sm text-slate-500 mt-1">Configuraciones básicas de tu cuenta y la aplicación</p>
        </div>
        
        <div class="p-8 space-y-8 text-sm">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">Idioma del Sistema</h3>
                    <p class="text-slate-500">Selecciona el idioma preferido para la interfaz.</p>
                </div>
                <div class="relative w-full sm:w-64">
                    <select class="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500 transition-all font-medium">
                        <option value="es" selected>Español (México)</option>
                        <option value="en">English (US)</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="w-full h-px bg-slate-100"></div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">Notificaciones por Correo</h3>
                    <p class="text-slate-500">Recibir resumen diario de accesos a tu correo.</p>
                </div>
                <div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" checked>
                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white auto-checked after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                    </label>
                </div>
            </div>

        </div>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-slate-100">
            <h2 class="text-xl font-bold text-slate-800">Accesibilidad</h2>
            <p class="text-sm text-slate-500 mt-1">Adapta la apariencia visual del sistema</p>
        </div>
        
        <div class="p-8 space-y-8 text-sm">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">Tamaño de Fuente</h3>
                    <p class="text-slate-500">Aumenta el tamaño del texto para mejorar la lectura.</p>
                </div>
                <div class="relative w-full sm:w-64">
                    <select class="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500 transition-all font-medium">
                        <option value="normal" selected>Normal</option>
                        <option value="grande">Grande</option>
                        <option value="extragrande">Extra Grande</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="w-full h-px bg-slate-100"></div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">Modo de Alto Contraste</h3>
                    <p class="text-slate-500">Colores más fuertes y definidos para pantallas brillantes.</p>
                </div>
                <div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white auto-checked after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                    </label>
                </div>
            </div>

        </div>
    </div>

</div>
@endsection