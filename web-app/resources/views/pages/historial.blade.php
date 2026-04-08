@extends('layouts.dashboard')

@section('title', 'Historial de Accesos')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- Filters/Search Bar -->
    <!-- Table and other markup same as before, but with added IDs for dynamic control -->
    <div class="bg-darksurface p-5 rounded-3xl shadow-lg border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:w-96">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text" id="historial-search" placeholder="Buscar por tipo, ID o estado..." class="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all shadow-inner font-medium placeholder-slate-400">
        </div>
        <div class="flex gap-3">
            <button id="download-pdf" class="px-5 py-3 bg-brand-600 border border-brand-500/50 rounded-2xl text-white font-semibold hover:bg-brand-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2">
                Descargar PDF
            </button>
        </div>
    </div>

    <div class="bg-darksurface rounded-3xl shadow-lg border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <th class="px-6 py-5 border-b border-white/5">Evento</th>
                        <th class="px-6 py-5 border-b border-white/5">Fecha y Hora</th>
                        <th class="px-6 py-5 border-b border-white/5">Usuario / Entidad</th>
                        <th class="px-6 py-5 border-b border-white/5">Método</th>
                        <th class="px-6 py-5 border-b border-white/5 text-right">Estado</th>
                    </tr>
                </thead>
                <tbody id="tabla-historial" class="divide-y divide-white/5">
                    <!-- Data will be injected here -->
                </tbody>
            </table>
        </div>
        
        <div class="px-6 py-5 border-t border-white/5 flex items-center justify-between text-sm font-medium text-slate-400 bg-white/[0.02]">
            <p id="historial-pagination-text">Cargando registros...</p>
            <div class="flex gap-2">
                <button id="prev-page" class="px-4 py-2 rounded-xl bg-[#090e1f] border border-white/10 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled>Anterior</button>
                <button id="next-page" class="px-4 py-2 rounded-xl bg-[#090e1f] border border-white/10 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Siguiente</button>
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", async () => {
        const { jsPDF } = window.jspdf;
        let originalData = [];
        let filteredData = [];
        let currentPage = 1;
        const rowsPerPage = 10;

        const tbody = document.getElementById('tabla-historial');
        const searchInput = document.getElementById('historial-search');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageText = document.getElementById('historial-pagination-text');
        const downloadBtn = document.getElementById('download-pdf');

        const renderTable = (data) => {
            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedData = data.slice(start, end);

            tbody.innerHTML = '';
            if (paginatedData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-10 text-center text-slate-500">No se encontraron registros</td></tr>';
                return;
            }

            paginatedData.forEach(acceso => {
                const row = `
                <tr class="hover:bg-white/5 transition-colors group">
                    <td class="px-6 py-5">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl ${acceso.tipo === 'Entrada' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-brand-500/10 text-brand-400 border-brand-500/20'} flex items-center justify-center shrink-0 border">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${acceso.tipo === 'Entrada' ? 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' : 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'}" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-[15px] font-bold text-white uppercase">${acceso.tipo}</p>
                                <p class="text-xs font-medium text-slate-400 mt-0.5">App Móvil</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-5">
                        <p class="text-[14px] font-semibold text-slate-200">${acceso.fecha}</p>
                        <p class="text-xs font-medium text-slate-400 mt-0.5">${acceso.hora}</p>
                    </td>
                    <td class="px-6 py-5">
                        <p class="text-[15px] font-bold text-white">ID: ${acceso.usuario_id}</p>
                        <p class="text-xs font-medium text-slate-500 mt-0.5">Autorizado</p>
                    </td>
                    <td class="px-6 py-5">
                        <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            App Móvil
                        </span>
                    </td>
                    <td class="px-6 py-5 text-right">
                        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${acceso.estado === 'Permitido' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'} border">
                            ${acceso.estado}
                        </span>
                    </td>
                </tr>
                `;
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

        // Fetch Data
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://127.0.0.1:5050/accesos/web/historial", {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                originalData = await response.json();
                filteredData = [...originalData];
                renderTable(filteredData);
            }
        } catch (error) {
            console.error("Error fetching historial:", error);
        }

        // Search Filter
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            filteredData = originalData.filter(item => 
                item.tipo.toLowerCase().includes(term) ||
                item.usuario_id.toString().includes(term) ||
                item.estado.toLowerCase().includes(term) ||
                item.fecha.toLowerCase().includes(term)
            );
            currentPage = 1;
            renderTable(filteredData);
        });

        // Pagination Buttons
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(filteredData);
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxPage = Math.ceil(filteredData.length / rowsPerPage);
            if (currentPage < maxPage) {
                currentPage++;
                renderTable(filteredData);
            }
        });

        // PDF Download
        downloadBtn.addEventListener('click', () => {
            const doc = new jsPDF();
            doc.text("Historial de Accesos - Sistema de Control", 14, 15);
            doc.setFontSize(10);
            doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 22);

            const tableData = filteredData.map(item => [
                item.tipo,
                `${item.fecha} ${item.hora}`,
                `ID: ${item.usuario_id}`,
                "App Móvil",
                item.estado
            ]);

            doc.autoTable({
                head: [['Evento', 'Fecha/Hora', 'Usuario', 'Método', 'Estado']],
                body: tableData,
                startY: 30,
                theme: 'striped',
                headStyles: { fillColor: [79, 70, 229] }
            });

            doc.save("historial_accesos.pdf");
        });
    });
</script>
@endsection