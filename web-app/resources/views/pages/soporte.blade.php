@extends('layouts.dashboard')

@section('title', 'Centro de Ayuda')

@section('content')
<div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

    <!-- FAQ Section -->
    <div class="md:col-span-2 space-y-6">
        <h2 class="text-xl font-bold text-slate-800">Preguntas Frecuentes</h2>
        
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
            <!-- FAQ Item -->
            <details class="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 text-slate-800">
                    <h2 class="font-semibold">¿Qué hago si un visitante no aparece en la lista autorizada?</h2>
                    <span class="shrink-0 rounded-full bg-slate-50 p-1.5 text-slate-500 group-open:bg-brand-50 group-open:text-brand-600">
                        <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-sm text-slate-500">
                    Si el visitante no está en la lista, debes retener el acceso y comunicarte inmediatamente con el anfitrión reportado para aprobar su entrada de forma manual, registrando el suceso en las notas de tu turno.
                </p>
            </details>

            <!-- FAQ Item -->
            <details class="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 text-slate-800">
                    <h2 class="font-semibold">¿Cómo registro la entrada manual de un vehículo?</h2>
                    <span class="shrink-0 rounded-full bg-slate-50 p-1.5 text-slate-500 group-open:bg-brand-50 group-open:text-brand-600">
                        <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-sm text-slate-500">
                    Dirígete a la sección "Control de Vehículos", haz clic en "Nuevo Vehículo" y captura los datos de placa, modelo y color, asignando el tipo de pase temporal que se le entregó.
                </p>
            </details>
            
            <!-- FAQ Item -->
            <details class="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 text-slate-800">
                    <h2 class="font-semibold">Olvidé mi contraseña, ¿cómo la recupero?</h2>
                    <span class="shrink-0 rounded-full bg-slate-50 p-1.5 text-slate-500 group-open:bg-brand-50 group-open:text-brand-600">
                        <svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>
                <p class="mt-4 leading-relaxed text-sm text-slate-500">
                    En la pantalla de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" e introduce tu correo institucional. Recibirás un enlace de restablecimiento seguro.
                </p>
            </details>
        </div>
    </div>

    <!-- Contact Support -->
    <div class="space-y-6">
        <h2 class="text-xl font-bold text-slate-800">Contacto</h2>
        
        <div class="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 text-white shadow-md text-center">
            <div class="mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 border border-white/20">
                <svg class="w-8 h-8 text-brand-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-2">¿Necesitas más ayuda?</h3>
            <p class="text-brand-100 text-sm mb-8 leading-relaxed">
                El equipo de soporte técnico está disponible de Lunes a Viernes (8AM - 6PM).
            </p>

            <button class="w-full py-3 px-4 bg-white text-brand-700 font-bold rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all text-sm mb-4">
                Crear Ticket de Soporte
            </button>

            <div class="pt-4 border-t border-brand-500/50">
                <p class="text-xs text-brand-200">o envía un correo a:</p>
                <a href="mailto:soporte@controlacceso.com" class="text-sm font-medium text-white hover:text-brand-200 transition-colors">soporte@controlacceso.com</a>
            </div>
        </div>
    </div>

</div>
@endsection