@extends('layouts.dashboard')

@section('title', 'Control de Vehículos')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
            <h2 class="text-lg font-bold text-slate-800">Vehículos Registrados</h2>
            <p class="text-sm text-slate-500">Administra los permisos de acceso vehicular</p>
        </div>
        <button class="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-medium shadow-sm hover:bg-brand-700 hover:shadow transform hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Vehículo
        </button>
    </div>

    <!-- Vehicles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for ($i = 0; $i < 4; $i++)
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
            
            <div class="h-2 bg-brand-500 w-full group-hover:bg-brand-400 transition-colors"></div>
            
            <div class="p-6">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        Permitido
                    </span>
                </div>

                <!-- Car Info -->
                <div class="mb-5">
                    <h3 class="text-xl font-bold text-slate-800">Nissan Versa</h3>
                    <p class="text-sm text-slate-500 mt-1">Blanco Perlado</p>
                </div>

                <!-- Plate Number -->
                <div class="bg-slate-50 rounded-lg p-3 border border-slate-200 border-dashed text-center mb-5">
                    <p class="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Placa</p>
                    <p class="text-lg font-mono font-bold text-slate-800 tracking-wider">QBC-4827</p>
                </div>

                <!-- User linked -->
                <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
                        JS
                    </div>
                    <div>
                        <p class="text-sm font-medium text-slate-700">Juan Sandoval</p>
                        <p class="text-xs text-slate-500">Propietario</p>
                    </div>
                </div>
            </div>
            
        </div>
        @endfor
    </div>

</div>
@endsection