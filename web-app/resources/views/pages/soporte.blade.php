@extends('layouts.dashboard')

@section('title', 'Centro de Ayuda')

@section('content')
<div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

    <!-- FAQ Section -->
    <div class="md:col-span-2 space-y-6">
        <h2 class="text-xl font-bold text-white">Preguntas Frecuentes</h2>

        <div class="bg-darksurface rounded-2xl shadow-sm border border-white/10 overflow-hidden divide-y divide-white/5">

            <details class="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 text-white">
                    <h3 class="font-semibold">¿Qué hago si un visitante no aparece en la lista autorizada?</h3>
                    <span class="shrink-0 rounded-full bg-white/5 p-1.5 text-slate-400 group-open:bg-brand-500/10 group-open:text-brand-400">
                        <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-sm text-slate-400">
                    Si el visitante no está en la lista, debes retener el acceso y comunicarte inmediatamente con el anfitrión reportado para aprobar su entrada de forma manual, registrando el suceso en las notas de tu turno.
                </p>
            </details>

            <details class="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 text-white">
                    <h3 class="font-semibold">¿Cómo registro la entrada manual de un vehículo?</h3>
                    <span class="shrink-0 rounded-full bg-white/5 p-1.5 text-slate-400 group-open:bg-brand-500/10 group-open:text-brand-400">
                        <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-sm text-slate-400">
                    Dirígete a la sección "Control de Vehículos", haz clic en "Nuevo Vehículo" y captura los datos de placa, modelo y color, asignando el tipo de pase temporal que se le entregó.
                </p>
            </details>

            <details class="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 text-white">
                    <h3 class="font-semibold">Olvidé mi contraseña, ¿cómo la recupero?</h3>
                    <span class="shrink-0 rounded-full bg-white/5 p-1.5 text-slate-400 group-open:bg-brand-500/10 group-open:text-brand-400">
                        <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-sm text-slate-400">
                    En la pantalla de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" e introduce tu correo institucional. Recibirás un enlace de restablecimiento seguro.
                </p>
            </details>

        </div>
    </div>

    <!-- Contact Support -->
    <div class="space-y-6">
        <h2 class="text-xl font-bold" style="color: var(--header-text)">Contacto</h2>

        <div class="bg-brand-600 dark:bg-linear-to-br dark:from-brand-600 dark:to-brand-800 rounded-3xl p-8 text-white shadow-md text-center border border-brand-500/30">
            <div class="mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 border border-white/20">
                <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>

            <h3 class="text-xl font-bold mb-2">¿Necesitas más ayuda?</h3>
            <p class="text-brand-100 text-sm mb-8 leading-relaxed font-medium">
                El equipo de soporte técnico está disponible de Lunes a Viernes (8AM - 6PM).
            </p>

            <button
                id="btn-abrir-ticket"
                onclick="openSupportModal()"
                class="w-full py-3 px-4 bg-white text-brand-700 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-sm mb-4">
                Crear Ticket de Soporte
            </button>

            <div class="pt-4 border-t border-brand-100/20">
                <p class="text-xs text-brand-200 font-bold mb-1">o envía un correo a:</p>
                <a href="mailto:controldeacceso698@gmail.com" class="text-sm font-bold text-white hover:text-brand-100 transition-colors">soporte@controlacceso.com</a>
            </div>
        </div>
    </div>

</div>

<!-- Support Ticket Modal -->
<div id="support-modal"
     class="fixed inset-0 z-50 items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
     style="display:none;">
    <div class="bg-darksurface w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 transform transition-all border border-white/10 relative">

        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-400 border border-brand-500/20">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-white">Crear Ticket</h3>
                    <p class="text-sm text-slate-400 font-medium">Describe tu problema técnico</p>
                </div>
            </div>
            <button onclick="closeSupportModal()" class="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Form -->
        <form id="support-form" class="space-y-5">
            @csrf
            <div>
                <label class="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest text-[11px]">Asunto del Ticket</label>
                <input type="text" name="asunto" id="s-asunto" required
                    placeholder="Ej: Problema con el lector de QR"
                    class="w-full px-5 py-3.5 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium placeholder-slate-600">
            </div>

            <div>
                <label class="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest text-[11px]">Prioridad</label>
                <select name="prioridad" id="s-prioridad"
                    class="w-full px-5 py-3.5 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 transition-all font-medium appearance-none">
                    <option value="Baja">Baja — Consulta general</option>
                    <option value="Media" selected>Media — Error en funcionalidad</option>
                    <option value="Alta">Alta — Bloqueo de acceso</option>
                    <option value="Crítica">Crítica — Sistema fuera de línea</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest text-[11px]">Descripción Detallada</label>
                <textarea name="mensaje" id="s-mensaje" required rows="4"
                    placeholder="Explique detalladamente qué sucede, cuándo ocurre y qué pasos siguió..."
                    class="w-full px-5 py-3.5 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium resize-none placeholder-slate-600"></textarea>
            </div>

            <button type="submit" id="s-submit-btn"
                class="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-500 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                Enviar Reporte
            </button>
        </form>

        <!-- ✅ Success Message (hidden by default) -->
        <div id="support-success" class="hidden flex-col items-center justify-center text-center py-6 gap-4">
            <div class="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
                <svg class="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
            </div>
            <h4 class="text-xl font-bold text-white">¡Ticket Enviado!</h4>
            <p id="success-ticket-id" class="text-sm text-slate-400 leading-relaxed"></p>
            <button onclick="closeSupportModal()" class="mt-4 px-8 py-3 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-500 transition-all">
                Cerrar
            </button>
        </div>

    </div>
</div>

<script>
    const modal   = document.getElementById('support-modal');
    const form    = document.getElementById('support-form');
    const success = document.getElementById('support-success');

    const openSupportModal = () => {
        form.classList.remove('hidden');
        success.classList.add('hidden');
        success.classList.remove('flex');
        form.reset();
        modal.style.display = 'flex';
    };

    const closeSupportModal = () => {
        modal.style.display = 'none';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('s-submit-btn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg> Enviando...`;
        btn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch("{{ route('soporte.enviar') }}", {
                method: 'POST',
                body: formData,
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                // Show success screen
                form.classList.add('hidden');
                const ticketIdEl = document.getElementById('success-ticket-id');
                ticketIdEl.textContent = result.mensaje;
                success.classList.remove('hidden');
                success.classList.add('flex');
            } else {
                showToast('error', result.error || 'No se pudo enviar el ticket');
            }
        } catch (err) {
            console.error('Support error:', err);
            showToast('error', 'Error de conexión al servidor');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled  = false;
        }
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSupportModal();
    });

    // Toast helper
    function showToast(type, msg) {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-6 right-6 z-[100] px-6 py-4 rounded-2xl font-semibold text-white shadow-2xl flex items-center gap-3 transition-all duration-300 ${type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'}`;
        toast.innerHTML = `<svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === 'error' ? 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M5 13l4 4L19 7'}"/>
        </svg><span>${msg}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 4000);
    }
</script>
@endsection