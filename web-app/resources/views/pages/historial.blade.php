@extends('layouts.dashboard')

@section('title', 'Historial de Accesos')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- Filters/Search Bar -->
    <div class="bg-darksurface p-5 rounded-3xl shadow-lg border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:w-96">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text" placeholder="Buscar por nombre, matrícula..." class="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all shadow-inner font-medium placeholder-slate-400">
        </div>
        <div class="flex gap-3">
            <button class="px-5 py-3 bg-[#090e1f] border border-white/10 rounded-2xl text-slate-300 font-semibold hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2 shadow-sm">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
            </button>
            <button class="px-5 py-3 bg-brand-600 border border-brand-500/50 rounded-2xl text-white font-semibold hover:bg-brand-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2">
                Descargar PDF
            </button>
        </div>
    </div>

    <!-- History List -->
    <div class="bg-darksurface rounded-3xl shadow-lg border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <th class="px-6 py-5 border-b border-white/5">Evento</th>
                        <th class="px-6 py-5 border-b border-white/5">Fecha y Hora</th>
                        <th class="px-6 py-5 border-b border-white/5">Usuario / Entidad</th>
                        <th class="px-6 py-5 border-b border-white/5">Método</th>
                        <th class="px-6 py-5 border-b border-white/5 text-right">Estado</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    @for ($i = 0; $i < 6; $i++)
                    <tr class="hover:bg-white/5 transition-colors group">
                        <td class="px-6 py-5">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-[15px] font-bold text-white">Entrada</p>
                                    <p class="text-xs font-medium text-slate-400 mt-0.5">Torno Principal</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-5">
                            <p class="text-[14px] font-semibold text-slate-200">19/02/2026</p>
                            <p class="text-xs font-medium text-slate-400 mt-0.5">07:15 AM</p>
                        </td>
                        <td class="px-6 py-5">
                            <p class="text-[15px] font-bold text-white">Estudiante Invitado</p>
                            <p class="text-xs font-medium text-slate-400 mt-0.5">Matrícula: 193481</p>
                        </td>
                        <td class="px-6 py-5">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                QR Móvil
                            </span>
                        </td>
                        <td class="px-6 py-5 text-right">
                            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                                Permitido
                            </span>
                        </td>
                    </tr>
                    @endfor
                </tbody>
            </table>
        </div>
        
        <!-- Pagination -->
        <div class="px-6 py-5 border-t border-white/5 flex items-center justify-between text-sm font-medium text-slate-400 bg-white/[0.02]">
            <p>Mostrando 1 a 6 de 32 registros</p>
            <div class="flex gap-2">
                <button class="px-4 py-2 rounded-xl bg-[#090e1f] border border-white/10 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled>Anterior</button>
                <button class="px-4 py-2 rounded-xl bg-[#090e1f] border border-white/10 hover:bg-white/10 hover:text-white transition-colors">Siguiente</button>
            </div>
        </div>
    </div>

</div>
@endsection