<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cartorios', function (Blueprint $table) {
            $table->id();

            $table->string('nome');
            $table->string('cnpj')->unique();
            $table->string('telefone');
            $table->string('email')->unique();

            $table->string('logradouro');
            $table->integer('numero');
            $table->string('bairro');
            $table->string('cidade');
            $table->string('estado');
            $table->string('cep');

            $table->unsignedBigInteger('responsavel_id')->nullable();
            $table->string('responsavel_nome');
            $table->string('responsavel_cpf');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cartorios');
    }
};