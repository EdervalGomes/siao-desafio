<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cartorio extends Model
{
    protected $fillable = [
        'nome',
        'cnpj',
        'telefone',
        'email',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'cep',
        'responsavel_id',
        'responsavel_nome',
        'responsavel_cpf',
    ];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class);
    }

    public function imoveis()
    {
        return $this->hasMany(Imovel::class);
    }
}