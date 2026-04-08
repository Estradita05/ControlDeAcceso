@extends('layouts.dashboard')

@section('title', 'Ajustes')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">

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
                    <select id="adj-font-size" class="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500 transition-all font-medium">
                        <option value="normal">Normal</option>
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
                        <input type="checkbox" id="adj-high-contrast" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white auto-checked after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                    </label>
                </div>
            </div>

        </div>
    </div>

</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const fontSel = document.getElementById('adj-font-size');
        const contrastCheck = document.getElementById('adj-high-contrast');

        // Initial values from localStorage
        fontSel.value = localStorage.getItem('pref-font-size') || 'normal';
        contrastCheck.checked = localStorage.getItem('pref-high-contrast') === 'true';

        // Listen for changes
        fontSel.addEventListener('change', (e) => {
            localStorage.setItem('pref-font-size', e.target.value);
            // The global script in dashboard.blade.php will handle the applier logic if we trigger it or it runs on next page load
            if (typeof applyAccessibility === 'function') applyAccessibility();
        });

        contrastCheck.addEventListener('change', (e) => {
            localStorage.setItem('pref-high-contrast', e.target.checked);
            if (typeof applyAccessibility === 'function') applyAccessibility();
        });
    });
</script>
@endsection