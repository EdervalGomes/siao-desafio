<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'cartorio_id',
        'name',
        'email',
        'password',
    ];

    public function cartorio()
    {
        return $this->belongsTo(Cartorio::class);
    }
}