@extends('layouts.dashboard')

@section('title', 'Ajustes')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">

    {{-- ── Apariencia / Tema ── --}}
    <div class="bg-darksurface rounded-3xl shadow-sm border border-white/10 overflow-hidden">
        <div class="px-8 py-6 border-b border-white/10 flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
            </div>
            <div>
                <h2 class="text-lg font-bold text-white">Apariencia</h2>
                <p class="text-sm text-slate-400 mt-0.5">Personaliza el tema visual del sistema</p>
            </div>
        </div>

        <div class="p-8 space-y-6 text-sm">

            {{-- Theme Toggle --}}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-white mb-1">Modo de Color</h3>
                    <p class="text-slate-400">Elige entre modo oscuro y claro para toda la aplicación.</p>
                </div>

                {{-- Visual theme selector --}}
                <div id="theme-selector" class="flex gap-3">
                    {{-- Dark --}}
                    <button id="btn-dark" onclick="setThemePref('dark')"
                        class="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 w-24"
                        :class="isDark ? 'border-brand-500 bg-brand-500/10' : 'border-white/10 hover:border-white/30'">
                        <div class="w-14 h-10 rounded-xl bg-[#0a0f1c] border border-white/20 flex items-center justify-center">
                            <svg class="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                            </svg>
                        </div>
                        <span class="text-xs font-semibold text-slate-300">Oscuro</span>
                    </button>

                    {{-- Light --}}
                    <button id="btn-light" onclick="setThemePref('light')"
                        class="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 w-24">
                        <div class="w-14 h-10 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center">
                            <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 3v1m0 16v1m8.66-9h-1M4.34 12H3m15.36-5.66l-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                        </div>
                        <span class="text-xs font-semibold text-slate-300">Claro</span>
                    </button>
                </div>
            </div>

        </div>
    </div>

    {{-- ── Accesibilidad ── --}}
    <div class="bg-darksurface rounded-3xl shadow-sm border border-white/10 overflow-hidden">
        <div class="px-8 py-6 border-b border-white/10 flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
            </div>
            <div>
                <h2 class="text-lg font-bold text-white">Accesibilidad</h2>
                <p class="text-sm text-slate-400 mt-0.5">Adapta la apariencia visual del sistema</p>
            </div>
        </div>

        <div class="p-8 space-y-8 text-sm">

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-white mb-1">Tamaño de Fuente</h3>
                    <p class="text-slate-400">Aumenta el tamaño del texto para mejorar la lectura.</p>
                </div>
                <div class="relative w-full sm:w-64">
                    <select id="adj-font-size" class="w-full appearance-none bg-[#0f172a] border border-white/10 text-slate-200 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all font-medium">
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

            <div class="w-full h-px bg-white/5"></div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 class="font-semibold text-white mb-1">Modo de Alto Contraste</h3>
                    <p class="text-slate-400">Colores más fuertes y definidos para pantallas brillantes.</p>
                </div>
                <div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="adj-high-contrast" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                    </label>
                </div>
            </div>

        </div>
    </div>

</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const fontSel      = document.getElementById('adj-font-size');
        const contrastCheck = document.getElementById('adj-high-contrast');
        const btnDark      = document.getElementById('btn-dark');
        const btnLight     = document.getElementById('btn-light');

        // ── Restore saved values ──────────────────────────────────────
        fontSel.value         = localStorage.getItem('pref-font-size') || 'normal';
        contrastCheck.checked = localStorage.getItem('pref-high-contrast') === 'true';

        const refreshThemeButtons = () => {
            const current = localStorage.getItem('pref-theme') || 'dark';
            if (current === 'dark') {
                btnDark.classList.add('border-brand-500', 'bg-brand-500/10');
                btnDark.classList.remove('border-white/10');
                btnLight.classList.remove('border-brand-500', 'bg-brand-500/10');
                btnLight.classList.add('border-white/10');
            } else {
                btnLight.classList.add('border-brand-500', 'bg-brand-500/10');
                btnLight.classList.remove('border-white/10');
                btnDark.classList.remove('border-brand-500', 'bg-brand-500/10');
                btnDark.classList.add('border-white/10');
            }
        };
        refreshThemeButtons();

        // ── Font size ─────────────────────────────────────────────────
        fontSel.addEventListener('change', (e) => {
            localStorage.setItem('pref-font-size', e.target.value);
            if (typeof applyAccessibility === 'function') applyAccessibility();
        });

        // ── High contrast ─────────────────────────────────────────────
        contrastCheck.addEventListener('change', (e) => {
            localStorage.setItem('pref-high-contrast', e.target.checked);
            if (typeof applyAccessibility === 'function') applyAccessibility();
        });
    });

    function setThemePref(theme) {
        localStorage.setItem('pref-theme', theme);
        // Trigger the global theme applier from dashboard.blade.php
        const html = document.getElementById('html-root');
        if (theme === 'light') {
            html.classList.remove('dark');
            html.classList.add('light');
            document.getElementById('icon-sun').style.opacity  = '0';
            document.getElementById('icon-sun').style.transform = 'scale(0.5)';
            document.getElementById('icon-moon').style.opacity  = '1';
            document.getElementById('icon-moon').style.transform = 'scale(1)';
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            document.getElementById('icon-sun').style.opacity  = '1';
            document.getElementById('icon-sun').style.transform = 'scale(1)';
            document.getElementById('icon-moon').style.opacity  = '0';
            document.getElementById('icon-moon').style.transform = 'scale(0.5)';
        }
        // Refresh button styles
        const btnDark  = document.getElementById('btn-dark');
        const btnLight = document.getElementById('btn-light');
        if (theme === 'dark') {
            btnDark.classList.add('border-brand-500', 'bg-brand-500/10');
            btnDark.classList.remove('border-white/10');
            btnLight.classList.remove('border-brand-500', 'bg-brand-500/10');
            btnLight.classList.add('border-white/10');
        } else {
            btnLight.classList.add('border-brand-500', 'bg-brand-500/10');
            btnLight.classList.remove('border-white/10');
            btnDark.classList.remove('border-brand-500', 'bg-brand-500/10');
            btnDark.classList.add('border-white/10');
        }
    }
</script>
@endsection