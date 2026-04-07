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
    public $timestamps = false; // El modelo Administradores en FastAPI no tiene timestamps

    protected $fillable = [
        'nombre',
        'correo',
        'contraseña',
    ];

    protected $hidden = [
        'contraseña',
        'remember_token',
    ];

    /**
     * Override the password name so Auth::attempt knows which column to verify.
     */
    public function getAuthPasswordName()
    {
        return 'contraseña';
    }

    /**
     * Get the password for the user.
     */
    public function getAuthPassword()
    {
        // Python's passlib uses $2b$ which is incompatible with PHP's default bcrypt $2y$.
        // By replacing the prefix before verification, Laravel can successfully check the hash.
        return str_replace('$2b$', '$2y$', $this->contraseña);
    }
}
