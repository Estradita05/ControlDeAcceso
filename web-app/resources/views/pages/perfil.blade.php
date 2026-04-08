@extends('layouts.dashboard')

@section('title', 'Mi Perfil')

@section('content')
<div class="max-w-4xl mx-auto" id="profile-container">

    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-8">
        
        <!-- Cover Photo area -->
        <div class="h-32 bg-gradient-to-r from-brand-500 to-brand-700 w-full relative"></div>

        <div class="px-8 pb-8">
            <!-- Avatar Header -->
            <div class="relative flex justify-between items-end -mt-12 mb-8">
                <div class="flex items-end gap-6">
                    <div class="w-28 h-28 rounded-2xl bg-white p-1.5 shadow-lg relative">
                        <div id="p-avatar" class="w-full h-full bg-brand-100 rounded-xl flex items-center justify-center text-4xl text-brand-600 font-bold overflow-hidden">
                            <!-- Injected -->
                        </div>
                        <div class="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                    <div class="pb-2">
                        <h2 id="p-nombre" class="text-2xl font-bold text-slate-800 tracking-tight">Cargando...</h2>
                        <p id="p-rol" class="text-brand-600 font-medium">Personal Autorizado</p>
                    </div>
                </div>

                <div class="pb-2 flex gap-3">
                    <a href="/editar-perfil" class="px-5 py-2.5 bg-brand-50 text-brand-700 hover:bg-brand-100 font-medium rounded-xl flex items-center gap-2 transition">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar Perfil
                    </a>
                </div>
            </div>

            <!-- User Info Grid -->
            <h3 class="text-lg font-bold text-slate-800 mb-4">Información Personal</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 font-medium">
                
                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">Matrícula</span>
                    <span id="p-matricula" class="block text-slate-800 font-bold font-mono">--</span>
                </div>

                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">Correo Electrónico</span>
                    <span id="p-email" class="block text-slate-800">--</span>
                </div>

                <div>
                    <span class="block text-sm font-medium text-slate-500 mb-1">Estatus</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Activo</span>
                </div>

                <div class="md:col-span-2 pt-4 border-t border-slate-200/60 flex justify-between items-center">
                    <div>
                        <span class="block text-sm font-medium text-slate-500">Acceso al Sistema</span>
                        <span class="block text-sm text-slate-700">Autenticación mediante Token JWT</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            // Note: Since this is the Web Dashboard, we might need a dedicated endpoint for guard profile 
            // but the usuarios/perfil works for the current user session.
            const response = await fetch("http://127.0.0.1:5050/auth/perfil", {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });


            if (response.ok) {
                const data = await response.json();
                const u = data.usuario;
                
                document.getElementById('p-nombre').innerText = u.nombre;
                document.getElementById('p-matricula').innerText = u.matricula;
                document.getElementById('p-email').innerText = u.email;
                
                const avatar = document.getElementById('p-avatar');
                if (u.foto_perfil) {
                    avatar.innerHTML = `<img src="${u.foto_perfil}" class="w-full h-full object-cover">`;
                } else {
                    avatar.innerText = u.nombre.charAt(0).toUpperCase();
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    });
</script>
@endsection