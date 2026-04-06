@extends('layouts.app')

@section('content')
<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img src="{{ asset('images/login-bg.png') }}" class="w-full h-full object-cover" alt="Background">
        <!-- Overlay to ensure text readability -->
        <div class="absolute inset-0 bg-brand-900/60 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
    </div>

    <!-- Glassmorphism Card -->
    <div class="relative z-10 w-full max-w-md p-8 md:p-10 mx-4">
        <div class="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-3xl overflow-hidden">
            
            <div class="px-8 pt-8 pb-6 text-center">
                <img src="{{ asset('images/logo.png') }}" class="w-24 mx-auto mb-6 drop-shadow-xl" alt="Logo">
                <h2 class="text-3xl font-bold text-white tracking-tight mb-2">Bienvenido</h2>
                <p class="text-blue-100/80 text-sm font-medium">Panel de Control de Acceso</p>
            </div>

            <div class="px-8 pb-8">
                <form id="loginForm" class="space-y-5" onsubmit="event.preventDefault(); hacerLogin();">
                    
                    <div>
                        <label class="block text-sm font-medium text-blue-50 mb-1.5 ml-1">Correo Electrónico</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-200">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                                <input 
                                id="email"
                                type="email" 
                                placeholder="tu@correo.com"
                                class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-blue-200/50 outline-none focus:bg-white/20 focus:border-brand-300 focus:ring-2 focus:ring-brand-300/50 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-blue-50 mb-1.5 ml-1">Contraseña</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-200">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input 
                                id="password"
                                type="password" 
                                placeholder="••••••••"
                                class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-blue-200/50 outline-none focus:bg-white/20 focus:border-brand-300 focus:ring-2 focus:ring-brand-300/50 transition-all duration-300"
                            />
                        </div>
                        <div class="flex justify-between mt-2">
                            <span id="error-msg" class="text-sm font-medium text-red-500 hidden">Credenciales incorrectas</span>
                            <a href="/reset" class="text-sm text-brand-200 hover:text-white transition-colors duration-200">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div class="pt-4">
                        <button class="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-brand-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                            Iniciar Sesión
                        </button>
                    </div>

                </form>
            </div>
        </div>
        
        <!-- Footer text below card -->
        <div class="mt-8 text-center text-slate-300/60 text-xs">
            &copy; 2026 Control de Acceso . Todos los derechos reservados.
        </div>
    </div>
</div>

<script>
    async function hacerLogin() {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.classList.add("hidden");

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(!email || !password) return;

        try {
            const res = await fetch("http://127.0.0.1:5050/auth/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            const data = await res.json();

            if (res.ok) {
                // Login exitoso, guardamos token
                localStorage.setItem("token", data.access_token);
                window.location.href = "/menu";
            } else {
                // Credenciales invalidas u otro error
                errorMsg.innerText = data.detail || "Error al iniciar sesión";
                errorMsg.classList.remove("hidden");
            }

        } catch (error) {
            console.error("Error de Red:", error);
            errorMsg.innerText = "Error de red. Verifica conexión a API.";
            errorMsg.classList.remove("hidden");
        }
    }
</script>
@endsection