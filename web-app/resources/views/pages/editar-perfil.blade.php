@extends('layouts.dashboard')

@section('title', 'Editar Perfil')

@section('content')
<div class="max-w-3xl mx-auto">

    <div class="mb-6">
        <a href="/perfil" class="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Perfil
        </a>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        <div class="p-8 pb-0">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Configuración de la Cuenta</h2>
            <p class="text-slate-500">Actualiza tu foto y detalles personales aquí.</p>
        </div>

        <div class="p-8">
            <form action="" method="POST" class="space-y-8">
                
                <!-- Avatar Section -->
                <div class="flex items-center gap-6 pb-8 border-b border-slate-100">
                    <div class="w-20 h-20 rounded-2xl bg-brand-100 flex items-center justify-center text-2xl text-brand-600 font-bold shrink-0">
                        CH
                    </div>
                    <div>
                        <div class="flex gap-3 mb-2">
                            <button type="button" class="px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 font-medium rounded-xl text-sm transition">
                                Subir Nueva Foto
                            </button>
                            <button type="button" class="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
                                Eliminar
                            </button>
                        </div>
                        <p class="text-xs text-slate-400">Archivos recomendados: JPG o PNG. Tamaño máximo 1MB.</p>
                    </div>
                </div>

                <!-- Personal Data Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="col-span-2">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Datos Personales</h3>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Nombre Completo</label>
                        <input class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all font-medium" value="Carlos Hernández">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
                        <input type="email" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all font-medium" value="124050109@edu.mx">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Teléfono (opcional)</label>
                        <input type="tel" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all font-medium" value="4425414521">
                    </div>
                </div>

                <!-- Security Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                    <div class="col-span-2">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Seguridad (Contraseña)</h3>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Contraseña Actual</label>
                        <input type="password" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-400" placeholder="••••••••">
                    </div>

                    <div class="col-span-2"></div> <!-- Spacer for grid layout -->

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Nueva Contraseña</label>
                        <input type="password" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-400" placeholder="••••••••">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Confirmar Nueva Contraseña</label>
                        <input type="password" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-400" placeholder="••••••••">
                    </div>
                </div>

                <!-- Actions -->
                <div class="pt-8 flex items-center justify-end gap-3 border-t border-slate-100 mt-8">
                    <a href="/perfil" class="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                        Cancelar
                    </a>
                    <button type="button" class="px-6 py-2.5 bg-brand-600 border border-brand-600 rounded-xl text-white font-medium hover:bg-brand-700 shadow-sm hover:shadow transform hover:-translate-y-0.5 transition-all">
                        Guardar Cambios
                    </button>
                </div>

            </form>
        </div>

    </div>

</div>
@endsection