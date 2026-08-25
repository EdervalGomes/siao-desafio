<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Cartorio;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_com_sucesso()
    {
        $cartorio = Cartorio::create([
            'nome' => 'Central',
            'cnpj' => '12345678000199',
            'telefone' => '81999999999',
            'email' => 'cartorio@teste.com',
            'logradouro' => 'Rua A',
            'numero' => '100',
            'bairro' => 'Centro',
            'cidade' => 'Recife',
            'estado' => 'PE',
            'cep' => '50000000',
            'responsavel_nome' => 'Administrador',
            'responsavel_cpf' => '11111111111',
        ]);

        User::create([
            'name' => 'Administrador',
            'email' => 'admin@teste.com',
            'password' => bcrypt('123456'),
            'cartorio_id' => $cartorio->id,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@teste.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }
}