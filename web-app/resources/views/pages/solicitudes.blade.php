@extends('layouts.dashboard')

@section('title', 'Solicitudes de Acceso')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-darksurface p-6 rounded-3xl shadow-lg border border-white/10">
        <div>
            <h2 class="text-2xl font-extrabold text-white tracking-wide">Solicitudes de Acceso</h2>
            <p class="text-sm font-medium text-slate-400 mt-1">Revisa y gestiona las solicitudes de acceso provisional</p>
        </div>
        <div class="flex gap-3">
            <button onclick="filtrarEstado('PENDIENTE')" id="btn-pend" class="px-4 py-2 rounded-xl text-sm font-bold border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all">
                Pendientes
            </button>
            <button onclick="filtrarEstado('')" id="btn-all" class="px-4 py-2 rounded-xl text-sm font-bold border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                Ver todas
            </button>
        </div>
    </div>

    <!-- Grid de solicitudes -->
    <div id="grid-solicitudes" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <!-- cargando... -->
        <div id="loader" class="col-span-3 flex justify-center py-16">
            <div class="w-10 h-10 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
        </div>
    </div>
</div>

<!-- Modal Rechazo -->
<div id="reject-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-darksurface w-full max-w-md rounded-3xl border border-white/10 shadow-2xl p-8">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Rechazar Solicitud
            </h3>
            <button onclick="closeRejectModal()" class="text-slate-500 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <p class="text-sm text-slate-400 mb-5">El alumno recibirá una notificación con el motivo de rechazo.</p>
        <form id="reject-form" class="space-y-4">
            <input type="hidden" id="r-solicitud-id">
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Motivo de rechazo *</label>
                <textarea id="r-motivo" required rows="4"
                    placeholder="Ej: El vehículo ya está registrado en el sistema, documentación incompleta..."
                    class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-rose-500 transition-all resize-none">
                </textarea>
            </div>
            <div class="flex gap-3 mt-6">
                <button type="button" onclick="closeRejectModal()"
                    class="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
                    Cancelar
                </button>
                <button type="submit"
                    class="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-500 transition-all flex justify-center items-center gap-2"
                    id="reject-submit-btn">
                    Confirmar rechazo
                </button>
            </div>
        </form>
    </div>
</div>

<script>
const API = "http://10.165.238.244:5050";
const grid = document.getElementById('grid-solicitudes');
const loader = document.getElementById('loader');
let currentEstado = 'PENDIENTE';

const ESTADO_STYLE = {
    PENDIENTE: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Pendiente' },
    APROBADA:  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Aprobada' },
    RECHAZADA: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', label: 'Rechazada' },
};

function filtrarEstado(estado) {
    currentEstado = estado;
    loadSolicitudes();
}

async function loadSolicitudes() {
    loader.classList.remove('hidden');
    grid.innerHTML = '';
    grid.appendChild(loader);

    try {
        const token = localStorage.getItem('token');
        const url = currentEstado
            ? `${API}/solicitudes?estado=${currentEstado}`
            : `${API}/solicitudes`;
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        loader.classList.add('hidden');

        if (!data.length) {
            grid.innerHTML = `<p class="col-span-3 text-slate-400 text-center py-16">No hay solicitudes ${currentEstado ? currentEstado.toLowerCase() + 's' : ''}.</p>`;
            return;
        }

        data.forEach(s => {
            const est = ESTADO_STYLE[s.estado] || ESTADO_STYLE.PENDIENTE;
            const fecha = s.creado_en ? new Date(s.creado_en).toLocaleString('es-MX') : '';
            const vehiculoStr = [s.marca, s.modelo].filter(Boolean).join(' ') || '—';
            const isPendiente = s.estado === 'PENDIENTE';

            const card = `
            <div class="bg-darksurface border border-white/10 rounded-[1.5rem] overflow-hidden hover:border-brand-500/40 transition-all duration-300 shadow-lg flex flex-col">
                <div class="h-1 ${s.estado === 'APROBADA' ? 'bg-gradient-to-r from-emerald-600 to-teal-400' : s.estado === 'RECHAZADA' ? 'bg-gradient-to-r from-rose-700 to-rose-400' : 'bg-gradient-to-r from-yellow-600 to-amber-400'}"></div>
                <div class="p-6 flex-1 flex flex-col gap-4">
                    <!-- Header -->
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-white font-bold text-lg">${s.nombre_alumno}</p>
                            <p class="text-slate-500 text-xs mt-0.5">${s.email_alumno}</p>
                            ${s.matricula ? `<p class="text-slate-500 text-xs">Mat: ${s.matricula}</p>` : ''}
                        </div>
                        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border ${est.bg} ${est.text} ${est.border}">${est.label}</span>
                    </div>

                    <!-- Vehículo -->
                    <div class="bg-[#090e1f]/80 rounded-xl p-4 border border-white/5">
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Vehículo</p>
                        <p class="text-brand-300 text-lg font-mono font-extrabold tracking-widest">${s.placa}</p>
                        <p class="text-slate-400 text-sm mt-1">${vehiculoStr}${s.color ? ' · ' + s.color : ''}</p>
                    </div>

                    <!-- Motivo -->
                    <div>
                        <p class="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Motivo</p>
                        <p class="text-slate-300 text-sm leading-relaxed">${s.motivo}</p>
                    </div>

                    ${s.motivo_rechazo ? `
                    <div class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
                        <p class="text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">Motivo de rechazo</p>
                        <p class="text-rose-300 text-sm">${s.motivo_rechazo}</p>
                    </div>` : ''}

                    <p class="text-slate-600 text-xs">${fecha}</p>

                    <!-- Acciones (solo si PENDIENTE) -->
                    ${isPendiente ? `
                    <div class="flex gap-3 mt-auto pt-2 border-t border-white/5">
                        <button onclick="aprobar(${s.id})"
                            class="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            Aprobar
                        </button>
                        <button onclick="openRejectModal(${s.id})"
                            class="flex-1 py-3 bg-rose-700 hover:bg-rose-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                            Rechazar
                        </button>
                    </div>` : ''}
                </div>
            </div>`;
            grid.insertAdjacentHTML('beforeend', card);
        });
    } catch (err) {
        console.error(err);
        loader.classList.add('hidden');
        grid.innerHTML = `<p class="col-span-3 text-rose-400 text-center py-10">Error al cargar las solicitudes.</p>`;
    }
}

async function aprobar(id) {
    if (!confirm('¿Confirmas que deseas APROBAR esta solicitud? Se creará el vehículo en el sistema.')) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${API}/solicitudes/${id}/aprobar`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            loadSolicitudes();
        } else {
            const err = await res.json();
            alert('Error: ' + (err.detail || 'No se pudo aprobar'));
        }
    } catch { alert('Error de conexión.'); }
}

function openRejectModal(id) {
    document.getElementById('r-solicitud-id').value = id;
    document.getElementById('r-motivo').value = '';
    const m = document.getElementById('reject-modal');
    m.classList.remove('hidden');
    m.classList.add('flex');
}

function closeRejectModal() {
    const m = document.getElementById('reject-modal');
    m.classList.remove('flex');
    m.classList.add('hidden');
}

document.getElementById('reject-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('r-solicitud-id').value;
    const motivo = document.getElementById('r-motivo').value.trim();
    if (!motivo) { alert('El motivo es obligatorio.'); return; }

    const btn = document.getElementById('reject-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${API}/solicitudes/${id}/rechazar`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ motivo_rechazo: motivo })
        });
        if (res.ok) {
            closeRejectModal();
            loadSolicitudes();
        } else {
            const err = await res.json();
            alert('Error: ' + (err.detail || 'No se pudo rechazar'));
        }
    } catch { alert('Error de conexión.'); }
    finally {
        btn.disabled = false;
        btn.textContent = 'Confirmar rechazo';
    }
});

document.addEventListener('DOMContentLoaded', loadSolicitudes);
</script>
@endsection
