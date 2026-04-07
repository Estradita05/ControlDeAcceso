<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', 'Control de Acceso')</title>
    
    <!-- Modern Fonts: Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Tailwind CDN & Config -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #030712; /* Tailwind gray-950 */
            background-image: 
                radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.2) 0, transparent 40%),
                radial-gradient(at 100% 100%, rgba(88, 28, 135, 0.2) 0, transparent 40%);
            background-attachment: fixed;
            position: relative;
            overflow-x: hidden;
            color: #f8fafc;
        }
        /* Dynamic Ambient Glow */
        .ambient-glow {
            position: absolute;
            filter: blur(120px);
            z-index: -1;
            border-radius: 50%;
            animation: breathe 8s infinite alternate ease-in-out;
            pointer-events: none;
        }
        @keyframes breathe {
            0% { transform: scale(1) translate(0, 0); opacity: 0.3; }
            100% { transform: scale(1.1) translate(30px, -20px); opacity: 0.5; }
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center antialiased relative selection:bg-blue-500/30 selection:text-blue-100">
    
    <!-- Decorative background blobs -->
    <div class="ambient-glow bg-blue-600/30 w-[500px] h-[500px] top-[-150px] left-[-150px]"></div>
    <div class="ambient-glow bg-indigo-600/20 w-[700px] h-[700px] bottom-[-200px] right-[-200px]" style="animation-delay: -4s"></div>

    <div class="w-full max-w-md px-6 z-10 relative">
        @yield('content')
    </div>
</body>
</html>