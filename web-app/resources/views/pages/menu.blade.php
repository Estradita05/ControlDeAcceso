@extends('layouts.dashboard')

@section('title', 'Inicio')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-brand-900 to-indigo-950 rounded-[2rem] p-10 text-white shadow-lg border border-brand-500/30 relative overflow-hidden group">
        <div class="relative z-10">
            <h2 class="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-200 tracking-tight">Bienvenido de nuevo 👋</h2>
            <p class="text-brand-100/80 max-w-2xl text-lg font-light leading-relaxed">
                Sistema de Control de Acceso avanzado. Desde aquí puedes monitorear el flujo en tiempo real, revisar historiales y administrar autorizaciones.
            </p>
        </div>
        <!-- Decorative bg elements -->
        <div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
            <div class="absolute right-[-10%] top-[-50%] w-[50%] h-[200%] bg-brand-500/30 blur-[80px] rounded-full transform rotate-45"></div>
            <div class="absolute left-[-10%] bottom-[-50%] w-[30%] h-[150%] bg-indigo-500/20 blur-[60px] rounded-full"></div>
        </div>
        <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Stat card -->
        <div class="bg-darksurface p-7 rounded-[1.5rem] shadow-md border border-white/10 flex flex-col justify-between group hover:border-brand-500/50 hover:bg-[#1f2937] transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            </div>
            <div class="flex items-center gap-4 mb-4 relative z-10">
                <div class="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857..."/>
                    </svg>
                </div>
                <p class="text-sm font-semibold text-slate-400 uppercase tracking-widest">Total Personas</p>
            </div>
            <p id="stat-personas" class="text-4xl font-extrabold text-white relative z-10">--</p>
        </div>

        <div class="bg-darksurface p-7 rounded-[1.5rem] shadow-md border border-white/10 flex flex-col justify-between group hover:border-orange-500/50 hover:bg-[#1f2937] transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
            </div>
            <div class="flex items-center gap-4 mb-4 relative z-10">
                <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                </div>
                <p class="text-sm font-semibold text-slate-400 uppercase tracking-widest">Total Vehículos</p>
            </div>
            <p id="stat-vehiculos" class="text-4xl font-extrabold text-white relative z-10">--</p>
        </div>

        <div class="bg-darksurface p-7 rounded-[1.5rem] shadow-md border border-white/10 flex flex-col justify-between group hover:border-emerald-500/50 hover:bg-[#1f2937] transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <div class="flex items-center gap-4 mb-4 relative z-10">
                <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <p class="text-sm font-semibold text-slate-400 uppercase tracking-widest">Permitidos</p>
            </div>
            <p id="stat-permitidos" class="text-4xl font-extrabold text-white relative z-10">--</p>
        </div>

        <div class="bg-darksurface p-7 rounded-[1.5rem] shadow-md border border-white/10 flex flex-col justify-between group hover:border-rose-500/50 hover:bg-[#1f2937] transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <div class="flex items-center gap-4 mb-4 relative z-10">
                <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <p class="text-sm font-semibold text-slate-400 uppercase tracking-widest">Denegados</p>
            </div>
            <p id="stat-denegados" class="text-4xl font-extrabold text-white relative z-10">--</p>
        </div>

    </div>

    <!-- Quick Access Links section -->
    <h3 class="text-xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
        Accesos Rápidos
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <a href="/historial" class="bg-darksurface rounded-[1.5rem] p-7 shadow-md border border-white/10 hover:border-brand-500/50 hover:bg-[#1f2937] transition-all duration-300 group flex flex-col items-start gap-5">
            <div class="p-4 bg-[#090e1f] rounded-2xl text-brand-400 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-inner border border-white/5">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Historial de Accesos</h4>
                <p class="text-sm text-slate-400 font-light leading-relaxed">Consulta los registros de entradas y salidas detallados en tiempo real.</p>
            </div>
        </a>

        <a href="/vehiculos" class="bg-darksurface rounded-[1.5rem] p-7 shadow-md border border-white/10 hover:border-brand-500/50 hover:bg-[#1f2937] transition-all duration-300 group flex flex-col items-start gap-5">
            <div class="p-4 bg-[#090e1f] rounded-2xl text-brand-400 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-inner border border-white/5">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Control de Vehículos</h4>
                <p class="text-sm text-slate-400 font-light leading-relaxed">Administra matrículas y accesos permitidos para unidades móviles.</p>
            </div>
        </a>

        <a href="/soporte" class="bg-darksurface rounded-[1.5rem] p-7 shadow-md border border-white/10 hover:border-brand-500/50 hover:bg-[#1f2937] transition-all duration-300 group flex flex-col items-start gap-5">
            <div class="p-4 bg-[#090e1f] rounded-2xl text-brand-400 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-inner border border-white/5">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.5 7.5 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">Ayuda y Soporte</h4>
                <p class="text-sm text-slate-400 font-light leading-relaxed">¿Tienes problemas técnicos? Contacta con el equipo de inmediato.</p>
            </div>
        </a>

    </div>

</div>

<script>
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // window.location.href = "/login"; // Descomentar en prod
                return;
            }

            // Endpoint backend
            const response = await fetch("http://127.0.0.1:5050/accesos/web/dashboard/estadisticas", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                document.getElementById('stat-personas').innerText = data.total_personas || 0;
                document.getElementById('stat-vehiculos').innerText = data.total_vehiculos || 0;
                document.getElementById('stat-permitidos').innerText = data.accesos_permitidos || 0;
                document.getElementById('stat-denegados').innerText = data.accesos_denegados || 0;
            } else {
                console.error("Error al cargar estadisticas");
            }
        } catch (error) {
            console.error("Error de conexion con la API:", error);
        }
    });
</script>
@endsection