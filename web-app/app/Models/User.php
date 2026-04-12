<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'administradores';
    protected $primaryKey = 'id_admin';
    public $timestamps = false; 

    protected $fillable = [
        'nombre',
        'correo',
        'contraseña',
    ];

    protected $hidden = [
        'contraseña',
        'remember_token',
    ];

    
    public function getAuthPasswordName()
    {
        return 'contraseña';
    }

    
    public function getAuthPassword()
    {
        
        return str_replace('$2b$', '$2y$', $this->contraseña);
    }
}
