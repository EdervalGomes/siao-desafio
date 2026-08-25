<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Cartorio;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $cartorio = Cartorio::create([
            'nome' => 'Cartório Central',
            'cnpj' => '12345678000199',
            'telefone' => '(81) 99999-9999',
            'email' => 'cartorio@teste.com',
            'logradouro' => 'Rua Central',
            'numero' => '100',
            'bairro' => 'Centro',
            'cidade' => 'Recife',
            'estado' => 'PE',
            'cep' => '50000000',
            'responsavel_id' => null,
            'responsavel_nome' => 'Administrador',
            'responsavel_cpf' => '12345678900'
        ]);

        User::create([
            'name' => 'Administrador',
            'email' => 'admin@teste.com',
            'password' => Hash::make('123456'),
            'cartorio_id' => $cartorio->id
        ]);
    }
}