@extends('layouts.dashboard')

@section('title', 'Control de Vehículos')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-darksurface p-6 rounded-3xl shadow-lg border border-white/10">
        <div>
            <h2 class="text-2xl font-extrabold text-white tracking-wide">Vehículos Registrados</h2>
            <p class="text-sm font-medium text-slate-400 mt-1">Administra los permisos y altas de acceso vehicular</p>
        </div>
        <button class="px-6 py-3 bg-brand-600 text-white rounded-2xl font-bold border border-brand-500/50 hover:bg-brand-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Vehículo
        </button>
    </div>

    <!-- Vehicles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-darksurface border border-white/10 rounded-[1.5rem] overflow-hidden hover:border-brand-500/50 hover:bg-[#1f2937] transition-all duration-300 group shadow-lg relative">
            
            <div class="h-1 bg-gradient-to-r from-brand-600 to-indigo-400 w-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <!-- Glowing background effect under card -->
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/10 rounded-full blur-[40px] group-hover:bg-brand-500/20 transition-all pointer-events-none"></div>

            <div class="p-7 relative z-10">
                <!-- Header -->
                <div class="flex items-start justify-between mb-5">
                    <div class="w-14 h-14 rounded-2xl bg-[#090e1f] text-brand-400 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        PERMITIDO
                    </span>
                </div>

                <!-- Car Info -->
                <div class="mb-6">
                    <h3 class="text-2xl font-extrabold text-white group-hover:text-brand-300 transition-colors">Nissan Versa</h3>
                    <p class="text-sm font-medium text-slate-400 mt-1">Blanco Perlado</p>
                </div>

                <!-- Plate Number -->
                <div class="bg-[#090e1f]/80 rounded-xl p-4 border border-white/5 border-dashed text-center mb-6 shadow-inner">
                    <p class="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-1.5">Placa Registrada</p>
                    <p class="text-xl font-mono font-extrabold text-brand-300 tracking-[0.2em] drop-shadow-[0_0_8px_rgba(165,180,252,0.3)]">QBC-4827</p>
                </div>

                <!-- User linked -->
                <div class="flex items-center gap-4 pt-5 border-t border-white/5">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/10">
                        JS
                    </div>
                    <div>
                        <p class="text-sm font-bold text-slate-200">Juan Sandoval</p>
                        <p class="text-xs font-medium text-slate-500 mt-0.5">Propietario / Empleado</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

</div>
@endsection