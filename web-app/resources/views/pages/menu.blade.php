@extends('layouts.dashboard')

@section('title', 'Inicio')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div class="relative z-10">
            <h2 class="text-3xl font-bold mb-2">Bienvenido de nuevo 👋</h2>
            <p class="text-brand-100 max-w-xl">
                Sistema de Control de Acceso . Desde aquí puedes monitorear el flujo de personas, ver historiales y administrar registros de vehículos.
            </p>
        </div>
        <!-- Decorative bg pattern -->
        <div class="absolute inset-0 opacity-10">
            <svg class="absolute right-0 top-0 h-full w-1/2 object-cover" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 M50,0 L100,50 L50,100 L0,50 Z" />
            </svg>
        </div>
    </div>

    <!-- Quick Stats Grid (Example data logic can be plugged in later) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Stat card -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
            <div class="w-14 h-14 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-slate-500">Total Personas</p>
                <p id="stat-personas" class="text-2xl font-bold text-slate-800">Cargando...</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
            <div class="w-14 h-14 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-slate-500">Total Vehículos</p>
                <p id="stat-vehiculos" class="text-2xl font-bold text-slate-800">Cargando...</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
            <div class="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-slate-500">Accesos Permitidos</p>
                <p id="stat-permitidos" class="text-2xl font-bold text-slate-800">Cargando...</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
            <div class="w-14 h-14 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-slate-500">Accesos Denegados</p>
                <p id="stat-denegados" class="text-2xl font-bold text-slate-800">Cargando...</p>
            </div>
        </div>

    </div>

    <!-- Quick Access Links section -->
    <h3 class="text-lg font-bold text-slate-800 mt-8 mb-4">Accesos Rápidos</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <a href="/historial" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-200 transition-all group flex flex-col items-start gap-4">
            <div class="p-3 bg-brand-50 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-slate-800 mb-1">Historial de Accesos</h4>
                <p class="text-sm text-slate-500">Consulta los registros de entradas y salidas detallados.</p>
            </div>
        </a>

        <a href="/vehiculos" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-200 transition-all group flex flex-col items-start gap-4">
            <div class="p-3 bg-brand-50 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-slate-800 mb-1">Control de Vehículos</h4>
                <p class="text-sm text-slate-500">Administra matriculas y accesos permitidos para unidades.</p>
            </div>
        </a>

        <a href="/soporte" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-200 transition-all group flex flex-col items-start gap-4">
            <div class="p-3 bg-brand-50 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.5 7.5 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-slate-800 mb-1">Ayuda y Soporte</h4>
                <p class="text-sm text-slate-500">¿Tienes problemas? Contacta al equipo técnico.</p>
            </div>
        </a>

    </div>

</div>

<script>
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/login";
                return;
            }

            // Hacemos peticion a la API (Puerto 5050 para tu backend)
            const response = await fetch("http://127.0.0.1:5050/accesos/web/dashboard/estadisticas", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                document.getElementById('stat-personas').innerText = data.total_personas;
                document.getElementById('stat-vehiculos').innerText = data.total_vehiculos;
                document.getElementById('stat-permitidos').innerText = data.accesos_permitidos;
                document.getElementById('stat-denegados').innerText = data.accesos_denegados;
            } else {
                console.error("Error al cargar estadisticas (Probablemente falte autenticacion login)");
                document.getElementById('stat-personas').innerText = "Error";
                document.getElementById('stat-vehiculos').innerText = "Error";
                document.getElementById('stat-permitidos').innerText = "Error";
                document.getElementById('stat-denegados').innerText = "Error";
            }
        } catch (error) {
            console.error("Error de conexion con la API:", error);
        }
    });
</script>
@endsection