<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SupportController extends Controller
{
    public function sendTicket(Request $request)
    {
        $request->validate([
            'asunto' => 'required|string|max:255',
            'mensaje' => 'required|string',
            'prioridad' => 'required|string'
        ]);

        try {
            // Data to send
            $data = [
                'asunto' => $request->asunto,
                'mensaje' => $request->mensaje,
                'prioridad' => $request->prioridad,
                'fecha' => now()->toDateTimeString()
            ];

            
            Mail::raw("Nuevo Ticket de Soporte:\n\nAsunto: {$data['asunto']}\nPrioridad: {$data['prioridad']}\nMensaje: {$data['mensaje']}\nFecha: {$data['fecha']}", function ($message) use ($data) {
                $message->to('soporte@controlacceso.com')
                        ->subject("NUEVO TICKET: " . $data['asunto']);
            });

            return response()->json(['mensaje' => 'Ticket enviado exitosamente. Nos pondremos en contacto pronto.']);
        } catch (\Exception $e) {
            Log::error("Error enviando ticket: " . $e->getMessage());
            return response()->json(['error' => 'Hubo un problema al enviar el ticket. Por favor intente más tarde.'], 500);
        }
    }
}
