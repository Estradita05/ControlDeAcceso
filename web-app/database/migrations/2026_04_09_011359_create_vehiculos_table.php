<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up()
    {
        if (Schema::hasTable('vehiculos')) {
            Schema::table('vehiculos', function (Blueprint $table) {
                if (!Schema::hasColumn('vehiculos', 'created_at')) {
                    $table->timestamps();
                }
            });
        } else {
            Schema::create('vehiculos', function (Blueprint $table) {
                $table->id();
                $table->string('placa', 20)->unique();
                $table->string('modelo', 50);
                $table->string('color', 30);
                $table->unsignedBigInteger('usuario_id');
                
                $table->foreign('usuario_id')
                      ->references('id')
                      ->on('usuarios')
                      ->onDelete('cascade');

                $table->timestamps();
            });
        }
    }

    
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
