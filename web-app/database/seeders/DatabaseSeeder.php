<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear un usuario administrador de pureba (Guardia)
        User::updateOrCreate(
            ['correo' => 'guardia@institucion.edu'],
            [
                'nombre' => 'Guardia de Prueba',
                'contraseña' => bcrypt('password123'),
            ]
        );
    }
}
