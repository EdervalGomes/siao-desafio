<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imovel extends Model
{
    protected $table = 'imoveis';

    protected $fillable = [
        'matricula',
        'valor_avaliacao',
        'cartorio_id',
    ];

    public function cartorio()
    {
        return $this->belongsTo(Cartorio::class);
    }
}