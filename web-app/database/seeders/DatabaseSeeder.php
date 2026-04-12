<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    
    public function run(): void
    {
        
        User::updateOrCreate(
            ['correo' => 'guardia@institucion.edu'],
            [
                'nombre' => 'Guardia de Prueba',
                'contraseña' => bcrypt('password123'),
            ]
        );
    }
}
