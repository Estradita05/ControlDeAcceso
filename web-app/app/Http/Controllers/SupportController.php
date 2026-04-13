<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SupportController extends Controller
{
    public function sendTicket(Request $request)
    {
        $request->validate([
            'asunto'    => 'required|string|max:255',
            'mensaje'   => 'required|string',
            'prioridad' => 'required|string|in:Baja,Media,Alta,Crítica',
        ]);

        $ticket = [
            'id'        => uniqid('TKT-'),
            'asunto'    => $request->asunto,
            'mensaje'   => $request->mensaje,
            'prioridad' => $request->prioridad,
            'fecha'     => now()->toDateTimeString(),
            'usuario'   => auth()->check() ? auth()->user()->email : 'Anónimo',
        ];

        try {
            // Persistir en archivo JSON en storage/app/tickets.json
            $ticketsPath = 'tickets.json';
            $existing = [];

            if (Storage::exists($ticketsPath)) {
                $existing = json_decode(Storage::get($ticketsPath), true) ?? [];
            }

            $existing[] = $ticket;
            Storage::put($ticketsPath, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

            // Log informativo
            Log::info("Ticket de soporte creado: [{$ticket['id']}] {$ticket['asunto']} (Prioridad: {$ticket['prioridad']})");

            return response()->json([
                'ok'      => true,
                'mensaje' => "Ticket #{$ticket['id']} creado correctamente. El equipo de soporte lo atenderá a la brevedad.",
                'ticket_id' => $ticket['id'],
            ]);

        } catch (\Exception $e) {
            Log::error("Error al guardar ticket de soporte: " . $e->getMessage());
            return response()->json([
                'ok'    => false,
                'error' => 'No se pudo registrar el ticket. Por favor intente más tarde.',
            ], 500);
        }
    }
}
