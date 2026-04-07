<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control de Acceso</title>
    
    <!-- Google Fonts: Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#eef2ff',
                            100: '#e0e7ff',
                            200: '#c7d2fe',
                            300: '#a5b4fc',
                            400: '#818cf8',
                            500: '#6366f1',
                            600: '#4f46e5',
                            700: '#4338ca',
                            800: '#3730a3',
                            900: '#312e81',
                            950: '#1e1b4b',
                        },
                        darkbase: '#030712', // Deeper, sharper dark (slate-950)
                        darksurface: '#111827', // Crisper gray-900 instead of indigo blur
                        darkborder: 'rgba(255, 255, 255, 0.1)', // Sharper borders
                    }
                }
            }
        }
    </script>
    <style>
        /* Custom Scrollbar for Dark Layout */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        body {
            background-color: theme('colors.darkbase');
            background-image: radial-gradient(at 100% 0%, rgba(79, 70, 229, 0.08) 0, transparent 40%),
                              radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.08) 0, transparent 40%);
            background-attachment: fixed;
        }
    </style>
</head>
<body class="font-sans text-slate-300 antialiased selection:bg-brand-500/30 selection:text-brand-100 h-screen overflow-hidden flex">

    <!-- Floating Sidebar -->
    <aside class="w-64 bg-[#0a0f1c] border-r border-[#1e293b] flex flex-col z-20 m-4 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <!-- Logo Area -->
        <div class="h-20 flex items-center px-6 border-b border-darkborder relative">
            <div class="absolute inset-0 bg-brand-500/10 blur-xl rounded-t-3xl"></div>
            <img src="{{ asset('images/logo.png') }}" class="h-9 w-auto mr-3 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] relative z-10" alt="Logo">
            <span class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-wider relative z-10">Control De Acceso</span>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <a href="/menu" class="group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 relative {{ request()->is('menu') ? 'bg-brand-600/10 text-white border border-brand-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                @if(request()->is('menu'))
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                @endif
                <svg class="h-5 w-5 transition-transform group-hover:scale-110 {{ request()->is('menu') ? 'text-brand-400' : '' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                Inicio
            </a>
            <a href="/historial" class="group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 relative {{ request()->is('historial') ? 'bg-brand-600/10 text-white border border-brand-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                @if(request()->is('historial'))
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                @endif
                <svg class="h-5 w-5 transition-transform group-hover:scale-110 {{ request()->is('historial') ? 'text-brand-400' : '' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Historial
            </a>
            <a href="/vehiculos" class="group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 relative {{ request()->is('vehiculos') ? 'bg-brand-600/10 text-white border border-brand-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                @if(request()->is('vehiculos'))
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                @endif
                <svg class="h-5 w-5 transition-transform group-hover:scale-110 {{ request()->is('vehiculos') ? 'text-brand-400' : '' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
                Vehículos
            </a>
            <a href="/perfil" class="group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 relative {{ request()->is('perfil*') ? 'bg-brand-600/10 text-white border border-brand-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                @if(request()->is('perfil*'))
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                @endif
                <svg class="h-5 w-5 transition-transform group-hover:scale-110 {{ request()->is('perfil*') ? 'text-brand-400' : '' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Perfil
            </a>
            <a href="/ajustes" class="group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 relative {{ request()->is('ajustes') ? 'bg-brand-600/10 text-white border border-brand-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                @if(request()->is('ajustes'))
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                @endif
                <svg class="h-5 w-5 transition-transform group-hover:scale-110 {{ request()->is('ajustes') ? 'text-brand-400' : '' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Ajustes
            </a>
            <a href="/soporte" class="group flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 relative {{ request()->is('soporte') ? 'bg-brand-600/10 text-white border border-brand-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                @if(request()->is('soporte'))
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                @endif
                <svg class="h-5 w-5 transition-transform group-hover:scale-110 {{ request()->is('soporte') ? 'text-brand-400' : '' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                Soporte
            </a>
        </nav>

        <!-- Bottom Logout Area -->
        <div class="p-4 border-t border-darkborder">
            <a href="/login" class="group flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-500/10 hover:text-red-400 transition-colors">
                <svg class="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Cerrar Sesión
            </a>
        </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        <!-- Top Navbar -->
        <header class="h-20 bg-transparent flex items-center justify-between px-8 shrink-0 z-10 pt-4">
            <div class="flex items-center">
                <h1 class="text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    @yield('title', 'Panel de Control')
                </h1>
            </div>
            
            <div class="flex items-center gap-5">
                <button class="relative p-2 text-slate-400 hover:text-white transition-colors bg-darksurface/50 backdrop-blur-md rounded-full border border-darkborder hover:border-brand-500/50 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                    <div class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#090e1f]"></div>
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <div class="flex items-center gap-3 pl-3 border-l border-darkborder">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-white/20">
                        A
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content container -->
        <div class="flex-1 overflow-y-auto p-8 relative z-0">
            @yield('content')
        </div>
        
    </main>

</body>
</html>
