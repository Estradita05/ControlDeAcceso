@extends('layouts.dashboard')

@section('title', 'Historial de Accesos')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- Filters/Search Bar -->
    <div class="bg-darksurface p-5 rounded-3xl shadow-lg border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:w-96">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text" id="historial-search"
                placeholder="Buscar por matrícula, tipo o estado..."
                class="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all shadow-inner font-medium placeholder-slate-500">
        </div>

        <!-- Filter pill -->
        <div class="flex items-center gap-2">
            <select id="filtro-estado" class="px-4 py-3 rounded-2xl bg-[#0f172a] border border-white/10 text-white text-sm font-medium outline-none focus:border-brand-500 transition-all appearance-none cursor-pointer">
                <option value="">Todos los estados</option>
                <option value="Permitido">Permitido</option>
                <option value="Denegado">Denegado</option>
                <option value="Anulado">Anulado</option>
            </select>
        </div>

        <div class="flex gap-3">
            <!-- Registrar denegado -->
            <button id="btn-denegado" class="px-5 py-3 bg-rose-600/20 border border-rose-500/30 rounded-2xl text-rose-400 font-semibold hover:bg-rose-600 hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
                Registrar Denegado
            </button>

            <button id="download-pdf" class="px-5 py-3 bg-brand-600 border border-brand-500/50 rounded-2xl text-white font-semibold hover:bg-brand-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Descargar PDF
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-darksurface rounded-3xl shadow-lg border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <th class="px-6 py-5 border-b border-white/5">Evento</th>
                        <th class="px-6 py-5 border-b border-white/5">Fecha y Hora</th>
                        <th class="px-6 py-5 border-b border-white/5">Matrícula / Alumno</th>
                        <th class="px-6 py-5 border-b border-white/5">Método</th>
                        <th class="px-6 py-5 border-b border-white/5 text-right">Estado</th>
                    </tr>
                </thead>
                <tbody id="tabla-historial" class="divide-y divide-white/5">
                    <!-- Data injected here -->
                </tbody>
            </table>
        </div>

        <div class="px-6 py-5 border-t border-white/5 flex items-center justify-between text-sm font-medium text-slate-400 bg-white/2">
            <p id="historial-pagination-text">Cargando registros...</p>
            <div class="flex gap-2">
                <button id="prev-page" class="px-4 py-2 rounded-xl bg-[#090e1f] border border-white/10 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled>Anterior</button>
                <button id="next-page" class="px-4 py-2 rounded-xl bg-[#090e1f] border border-white/10 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Siguiente</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal: Registrar Acceso Denegado -->
<div id="denied-modal" class="fixed inset-0 z-50 items-center justify-center p-4 bg-black/70 backdrop-blur-sm" style="display:none;">
    <div class="bg-darksurface w-full max-w-md rounded-3xl border border-rose-500/20 shadow-2xl p-8">
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-white">Registrar Acceso Denegado</h3>
            </div>
            <button onclick="closeDeniedModal()" class="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <p class="text-sm text-slate-400 mb-6 leading-relaxed">
             Una vez registrado quedara en estado <span class="text-rose-400 font-semibold">Denegado</span>.
        </p>
        <form id="denied-form" class="space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Matrícula del Alumno</label>
                <input type="text" id="d-matricula" required placeholder="Ej: 124050385"
                    class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-rose-500 transition-all">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Motivo del Rechazo</label>
                <textarea id="d-motivo" required rows="3" placeholder="Ej: Credencial vencida, matrícula inactiva..."
                    class="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-rose-500 transition-all resize-none"></textarea>
            </div>
            <div class="flex gap-3 pt-2">
                <button type="button" onclick="closeDeniedModal()" class="flex-1 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all">Cancelar</button>
                <button type="submit" id="d-submit-btn" class="flex-1 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500 transition-all flex items-center justify-center gap-2">
                    Confirmar Denegado
                </button>
            </div>
        </form>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", async () => {
        const { jsPDF } = window.jspdf;
        let originalData = [];
        let filteredData = [];
        let currentPage  = 1;
        const rowsPerPage = 10;

        const tbody       = document.getElementById('tabla-historial');
        const searchInput = document.getElementById('historial-search');
        const filtroEstado = document.getElementById('filtro-estado');
        const prevBtn     = document.getElementById('prev-page');
        const nextBtn     = document.getElementById('next-page');
        const pageText    = document.getElementById('historial-pagination-text');
        const downloadBtn = document.getElementById('download-pdf');

        // ── Render ─────────────────────────────────────────────────────
        const renderTable = (data) => {
            const start = (currentPage - 1) * rowsPerPage;
            const paginatedData = data.slice(start, start + rowsPerPage);

            tbody.innerHTML = '';
            if (paginatedData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-10 text-center text-slate-500">No se encontraron registros</td></tr>';
                updatePaginationControls(0);
                return;
            }

            paginatedData.forEach(acceso => {
                const esDenegado = acceso.estado === 'Denegado';
                const esAnulado  = acceso.estado === 'Anulado';
                const esEntrada  = acceso.tipo === 'Entrada';

                const iconPath = esEntrada
                    ? 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                    : 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1';

                const iconClass = esDenegado
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : esAnulado
                        ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        : esEntrada
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-brand-500/10 text-brand-400 border-brand-500/20';

                const estadoClass = esDenegado
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : esAnulado
                        ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

                const rowHighlight = esDenegado ? 'bg-rose-500/5 hover:bg-rose-500/10' : 'hover:bg-white/5';

                const row = `
                <tr class="${rowHighlight} transition-colors group">
                    <td class="px-6 py-5">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl ${iconClass} flex items-center justify-center shrink-0 border">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-[15px] font-bold ${esDenegado ? 'text-rose-300' : 'text-white'} uppercase">${acceso.tipo}</p>
                                <p class="text-xs font-medium text-slate-400 mt-0.5">App Móvil</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-5">
                        <p class="text-[14px] font-semibold text-slate-200">${acceso.fecha}</p>
                        <p class="text-xs font-medium text-slate-400 mt-0.5">${acceso.hora}</p>
                    </td>
                    <td class="px-6 py-5">
                        <p class="text-[15px] font-bold text-white font-mono">${acceso.matricula || 'N/A'}</p>
                        <p class="text-xs font-medium text-slate-500 mt-0.5">${acceso.nombre || ''}</p>
                    </td>
                    <td class="px-6 py-5">
                        <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            App Móvil
                        </span>
                    </td>
                    <td class="px-6 py-5 text-right">
                        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${estadoClass} border">
                            ${esDenegado ? '✕ ' : ''}${acceso.estado}
                        </span>
                    </td>
                </tr>`;
                tbody.insertAdjacentHTML('beforeend', row);
            });

            updatePaginationControls(data.length);
        };

        const updatePaginationControls = (total) => {
            const maxPage = Math.ceil(total / rowsPerPage);
            pageText.innerText = `Página ${currentPage} de ${maxPage || 1} (${total} registros)`;
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === maxPage || maxPage === 0;
        };

        // ── Fetch Data ─────────────────────────────────────────────────
        const fetchHistorial = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch("http://127.0.0.1:5050/accesos/web/historial", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    originalData = await response.json();
                    filteredData = [...originalData];
                    renderTable(filteredData);
                }
            } catch (error) {
                console.error("Error fetching historial:", error);
                tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-10 text-center text-rose-400 font-medium">Error al cargar los datos del servidor</td></tr>';
            }
        };

        await fetchHistorial();

        // ── Filtering ──────────────────────────────────────────────────
        const applyFilters = () => {
            const term   = searchInput.value.toLowerCase();
            const estado = filtroEstado.value;

            filteredData = originalData.filter(item => {
                const matchTerm = !term || (
                    (item.matricula || '').toLowerCase().includes(term) ||
                    (item.nombre    || '').toLowerCase().includes(term) ||
                    (item.tipo      || '').toLowerCase().includes(term) ||
                    (item.fecha     || '').toLowerCase().includes(term) ||
                    (item.estado    || '').toLowerCase().includes(term)
                );
                const matchEstado = !estado || item.estado === estado;
                return matchTerm && matchEstado;
            });

            currentPage = 1;
            renderTable(filteredData);
        };

        searchInput.addEventListener('input', applyFilters);
        filtroEstado.addEventListener('change', applyFilters);

        // ── Pagination ─────────────────────────────────────────────────
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) { currentPage--; renderTable(filteredData); }
        });
        nextBtn.addEventListener('click', () => {
            const maxPage = Math.ceil(filteredData.length / rowsPerPage);
            if (currentPage < maxPage) { currentPage++; renderTable(filteredData); }
        });

        // ── PDF ────────────────────────────────────────────────────────
        downloadBtn.addEventListener('click', () => {
            const doc = new jsPDF();
            doc.text("Historial de Accesos — Sistema de Control", 14, 15);
            doc.setFontSize(10);
            doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 22);

            const tableData = filteredData.map(item => [
                item.tipo,
                `${item.fecha} ${item.hora}`,
                item.matricula || 'N/A',
                item.nombre || '',
                item.estado
            ]);

            doc.autoTable({
                head: [['Evento', 'Fecha/Hora', 'Matrícula', 'Alumno', 'Estado']],
                body: tableData,
                startY: 30,
                theme: 'striped',
                headStyles: { fillColor: [79, 70, 229] },
                didParseCell: (data) => {
                    if (data.column.index === 4 && data.cell.raw === 'Denegado') {
                        data.cell.styles.textColor = [244, 63, 94];
                        data.cell.styles.fontStyle = 'bold';
                    }
                }
            });

            doc.save("historial_accesos.pdf");
        });
    });

    // ── Denied Modal ───────────────────────────────────────────────────
    const deniedModal = document.getElementById('denied-modal');
    document.getElementById('btn-denegado').addEventListener('click', () => {
        document.getElementById('denied-form').reset();
        deniedModal.style.display = 'flex';
    });
    const closeDeniedModal = () => { deniedModal.style.display = 'none'; };

    document.getElementById('denied-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const matricula = document.getElementById('d-matricula').value.trim();
        const motivo    = document.getElementById('d-motivo').value.trim();
        const btn       = document.getElementById('d-submit-btn');
        const orig      = btn.innerHTML;

        btn.innerHTML = 'Registrando...';
        btn.disabled  = true;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:5050/accesos/web/denegado", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricula, motivo })
            });

            const result = await response.json();
            if (response.ok) {
                closeDeniedModal();
                // Reload historial
                location.reload();
            } else {
                alert("Error: " + (result.detail || "No se pudo registrar"));
            }
        } catch (err) {
            alert("Error de conexión con el servidor");
        } finally {
            btn.innerHTML = orig;
            btn.disabled  = false;
        }
    });

    // Close denied modal on outside click
    deniedModal.addEventListener('click', (e) => {
        if (e.target === deniedModal) closeDeniedModal();
    });
</script>
@endsection