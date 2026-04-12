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
        <button onclick="openModal()" class="px-6 py-3 bg-brand-600 text-white rounded-2xl font-bold border border-brand-500/50 hover:bg-brand-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Vehículo
        </button>
    </div>

    <!-- Vehicles Grid -->
    <div id="grid-vehiculos" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Data injected here -->
    </div>

</div>

<!-- New Vehicle Modal -->
<div id="vehicle-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-darksurface w-full max-w-md rounded-4xl border border-white/10 shadow-2xl p-8 transform transition-all">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white">Nuevo Registro Vehicular</h3>
            <button onclick="closeModal()" class="text-slate-500 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <form id="vehicle-form" class="space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Matrícula del Alumno</label>
                <input type="text" id="v-matricula" required placeholder="Ej: 124050XXX" class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 transition-all">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Modelo / Marca</label>
                <input type="text" id="v-modelo" required placeholder="Ej: Nissan Sentra" class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 transition-all">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Placa</label>
                    <input type="text" id="v-placa" required placeholder="ABC-1234" class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 transition-all">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Color</label>
                    <input type="text" id="v-color" required placeholder="Gris" class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 transition-all">
                </div>
            </div>
            
            <button type="submit" class="w-full py-4 mt-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-500 transition-all">
                Registrar Vehículo
            </button>
        </form>
    </div>
</div>

<!-- Delete Vehicle Modal -->
<div id="delete-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-darksurface w-full max-w-md rounded-4xl border border-white/10 shadow-2xl p-8 transform transition-all">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <svg class="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Dar de Baja Vehículo
            </h3>
            <button onclick="closeDeleteModal()" class="text-slate-500 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <p class="text-sm text-slate-400 mb-6">
            Estás a punto de eliminar este vehículo del sistema. Esta acción requiere un motivo y quedará registrada en la bitácora del guardia.
        </p>

        <form id="delete-form" class="space-y-4">
            <input type="hidden" id="d-vehiculo-id">
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Motivo de la baja</label>
                <textarea id="d-motivo" required rows="3" placeholder="Ej: Se detectó mal uso de las instalaciones, cambio de vehículo..." class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-rose-500 transition-all resize-none"></textarea>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-3 mt-6">
                <button type="button" onclick="closeDeleteModal()" class="w-full sm:w-1/2 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
                    Cancelar
                </button>
                <button type="submit" class="w-full sm:w-1/2 py-4 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-500/20 hover:bg-rose-500 transition-all flex justify-center items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Confirmar Baja
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    const modal = document.getElementById('vehicle-modal');
    const form = document.getElementById('vehicle-form');
    const deleteModal = document.getElementById('delete-modal');
    const deleteForm = document.getElementById('delete-form');
    const grid = document.getElementById('grid-vehiculos');

    const openModal = () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };
    const closeModal = () => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    };

    const openDeleteModal = (id) => {
        document.getElementById('d-vehiculo-id').value = id;
        document.getElementById('d-motivo').value = '';
        deleteModal.classList.remove('hidden');
        deleteModal.classList.add('flex');
    };
    const closeDeleteModal = () => {
        deleteModal.classList.remove('flex');
        deleteModal.classList.add('hidden');
    };

    const loadVehiculos = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://127.0.0.1:5050/vehiculos/web/todos", {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const vehiculos = await response.json();
                grid.innerHTML = '';

                if (vehiculos.length === 0) {
                    grid.innerHTML = '<p class="text-slate-400">No hay vehículos registrados.</p>';
                    return;
                }

                vehiculos.forEach(v => {
                    const card = `
                    <div class="bg-darksurface border border-white/10 rounded-[1.5rem] overflow-hidden hover:border-brand-500/50 hover:bg-[#1f2937] transition-all duration-300 group shadow-lg">
                        <div class="h-1 bg-gradient-to-r from-brand-600 to-indigo-400 w-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div class="p-7 relative z-10">
                            <div class="flex items-start justify-between mb-5">
                                <div class="w-14 h-14 rounded-2xl bg-[#090e1f] text-brand-400 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">REGISTRADO</span>
                                    <button onclick="openDeleteModal(${v.id})" class="text-rose-500/70 hover:text-rose-400 p-2 rounded-full hover:bg-rose-500/10 transition-colors" title="Dar de baja vehículo">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="mb-6">
                                <h3 class="text-2xl font-extrabold text-white uppercase">${v.modelo}</h3>
                                <p class="text-sm font-medium text-slate-400 mt-1 capitalize">${v.color || 'Sin color'}</p>
                            </div>

                            <div class="bg-[#090e1f]/80 rounded-xl p-4 border border-white/5 border-dashed text-center mb-6 shadow-inner">
                                <p class="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-1.5">Placa Registrada</p>
                                <p class="text-xl font-mono font-extrabold text-brand-300 tracking-[0.2em]">${v.placa}</p>
                            </div>

                            <div class="flex items-center gap-4 pt-5 border-t border-white/5">
                                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">UT</div>
                                <div>
                                    <p class="text-sm font-bold text-slate-200">Matrícula: ${v.usuario_id}</p>
                                    <p class="text-xs font-medium text-slate-500 mt-0.5">Móvil Vinculado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    grid.insertAdjacentHTML('beforeend', card);
                });
            }
        } catch (error) {
            console.error("Error fetching vehiculos:", error);
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            usuario_id: document.getElementById('v-matricula').value,
            modelo: document.getElementById('v-modelo').value,
            color: document.getElementById('v-color').value,
            placa: document.getElementById('v-placa').value
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:5050/vehiculos/web/nuevo", {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                closeModal();
                form.reset();
                loadVehiculos(); // Refresh list immediately
            } else {
                const err = await response.json();
                alert("Error: " + (err.detail || "No se pudo registrar el vehículo"));
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Error de conexión: No se pudo contactar con el servidor.");
        }
    });

    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('d-vehiculo-id').value;
        const motivo = document.getElementById('d-motivo').value;
        
        // Deshabilitar botón para evitar doble envío
        const submitBtn = deleteForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Procesando...';
        submitBtn.disabled = true;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:5050/vehiculos/web/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ motivo })
            });

            if (response.ok) {
                closeDeleteModal();
                deleteForm.reset();
                loadVehiculos(); // Refrescar la lista de vehículos directamente
                
                // Opcional: mostrar notificación de éxito (puedes agregar Toast si usas una librería)
                console.log("Vehículo dado de baja correctamente.");
            } else {
                const err = await response.json();
                alert("Error: " + (err.detail || "No se pudo eliminar el vehículo."));
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error de conexión: No se pudo contactar con el servidor.");
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    });

    document.addEventListener("DOMContentLoaded", loadVehiculos);
</script>
@endsection