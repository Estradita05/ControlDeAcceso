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
            <form id="edit-profile-form" class="space-y-8">
                
                <!-- Avatar Section -->
                <div class="flex items-center gap-6 pb-8 border-b border-slate-100">
                    <div id="e-avatar-container" class="w-20 h-20 rounded-2xl bg-brand-100 flex items-center justify-center text-2xl text-brand-600 font-bold shrink-0 overflow-hidden">
                        <!-- Injected -->
                    </div>
                    <div>
                        <div class="flex gap-3 mb-2">
                            <input type="file" id="v-foto" class="hidden" accept="image/*">
                            <button type="button" onclick="document.getElementById('v-foto').click()" class="px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 font-medium rounded-xl text-sm transition">
                                Subir Nueva Foto
                            </button>
                            <button type="button" id="remove-photo" class="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
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
                        <input id="e-nombre" required class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all font-medium">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
                        <input id="e-email" type="email" required class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all font-medium">
                    </div>
                </div>

                <!-- Security Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                    <div class="col-span-2">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4 text-brand-700">Cambiar Contraseña (Opcional)</h3>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Nueva Contraseña</label>
                        <input id="e-password" type="password" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-400" placeholder="••••••••">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Confirmar Nueva Contraseña</label>
                        <input id="e-password-confirm" type="password" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-400" placeholder="••••••••">
                    </div>
                </div>

                <!-- Actions -->
                <div class="pt-8 flex items-center justify-end gap-3 border-t border-slate-100 mt-8">
                    <a href="/perfil" class="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                        Cancelar
                    </a>
                    <button type="submit" class="px-6 py-2.5 bg-brand-600 border border-brand-600 rounded-xl text-white font-medium hover:bg-brand-700 shadow-sm hover:shadow transform hover:-translate-y-0.5 transition-all">
                        Guardar Cambios
                    </button>
                </div>

            </form>
        </div>

    </div>

</div>

<script>
    document.addEventListener("DOMContentLoaded", async () => {
        const token = localStorage.getItem("token");
        const form = document.getElementById('edit-profile-form');
        const avatarContainer = document.getElementById('e-avatar-container');
        const fileInput = document.getElementById('v-foto');
        let currentPhotoB64 = null;

        if (!token) return;

        // Load current data
        try {
            const response = await fetch("http://127.0.0.1:5050/auth/perfil", {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                const u = data.usuario;
                document.getElementById('e-nombre').value = u.nombre;
                document.getElementById('e-email').value = u.email;
                
                if (u.foto_perfil) {
                    avatarContainer.innerHTML = `<img src="${u.foto_perfil}" class="w-full h-full object-cover">`;
                    currentPhotoB64 = u.foto_perfil;
                } else {
                    avatarContainer.innerText = u.nombre.charAt(0).toUpperCase();
                }
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }

        // Photo Preview
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (re) => {
                    currentPhotoB64 = re.target.result;
                    avatarContainer.innerHTML = `<img src="${currentPhotoB64}" class="w-full h-full object-cover">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Remove Photo
        document.getElementById('remove-photo').addEventListener('click', () => {
            currentPhotoB64 = "";
            avatarContainer.innerHTML = "";
            avatarContainer.innerText = document.getElementById('e-nombre').value.charAt(0).toUpperCase() || "?";
        });

        // Submit form
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const password = document.getElementById('e-password').value;
            const confirm = document.getElementById('e-password-confirm').value;

            if (password && password !== confirm) {
                alert("Las contraseñas no coinciden");
                return;
            }

            const data = {
                nombre: document.getElementById('e-nombre').value,
                email: document.getElementById('e-email').value,
                foto_perfil: currentPhotoB64
            };

            if (password) data.password = password;

            try {
                const updateRes = await fetch("http://127.0.0.1:5050/auth/perfil", {
                    method: 'PUT',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });


                if (updateRes.ok) {
                    window.location.href = "/perfil";
                } else {
                    const err = await updateRes.json();
                    alert("Error: " + (err.detail || "No se pudo actualizar el perfil"));
                }
            } catch (error) {
                console.error("Update error:", error);
            }
        });
    });
</script>
@endsection