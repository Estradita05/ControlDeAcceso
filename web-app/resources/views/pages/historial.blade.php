@extends('layouts.dashboard')

@section('title', 'Historial de Accesos')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- Filters/Search Bar -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:w-96">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text" placeholder="Buscar por nombre, matrícula o ID..." class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 outline-none focus:bg-white focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all">
        </div>
        <div class="flex gap-2">
            <button class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-brand-600 transition-colors flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
            </button>
            <button class="px-4 py-2.5 bg-brand-600 border border-brand-600 rounded-xl text-white font-medium hover:bg-brand-700 transition-colors flex items-center gap-2">
                Descargar PDF
            </button>
        </div>
    </div>

    <!-- History List -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <th class="px-6 py-4 font-semibold border-b border-slate-100">Evento</th>
                        <th class="px-6 py-4 font-semibold border-b border-slate-100">Fecha y Hora</th>
                        <th class="px-6 py-4 font-semibold border-b border-slate-100">Usuario / Entidad</th>
                        <th class="px-6 py-4 font-semibold border-b border-slate-100">Método</th>
                        <th class="px-6 py-4 font-semibold border-b border-slate-100 text-right">Estado</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @for ($i = 0; $i < 6; $i++)
                    <tr class="hover:bg-slate-50/50 transition-colors group">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-slate-800">Entrada</p>
                                    <p class="text-xs text-slate-500">Torno Principal</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-sm text-slate-700">19/02/2026</p>
                            <p class="text-xs text-slate-500">07:15 AM</p>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-sm font-medium text-slate-800">Estudiante Invitado</p>
                            <p class="text-xs text-slate-500">Matrícula: 193481</p>
                        </td>
                        <td class="px-6 py-4">
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                QR Móvil
                            </span>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Permitido
                            </span>
                        </td>
                    </tr>
                    @endfor
                </tbody>
            </table>
        </div>
        
        <!-- Pagination Mock -->
        <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 bg-slate-50/50">
            <p>Mostrando 1 a 6 de 32 registros</p>
            <div class="flex gap-2">
                <button class="px-3 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50" disabled>Anterior</button>
                <button class="px-3 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50">Siguiente</button>
            </div>
        </div>
    </div>

</div>
@endsection