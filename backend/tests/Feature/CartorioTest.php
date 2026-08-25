<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Cartorio;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartorioTest extends TestCase
{
    use RefreshDatabase;

    private function autenticar()
    {
        $cartorio = Cartorio::create([
            'nome' => 'Cartório Central',
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

        $user = User::create([
            'name' => 'Administrador',
            'email' => 'admin@teste.com',
            'password' => bcrypt('123456'),
            'cartorio_id' => $cartorio->id,
        ]);

        Sanctum::actingAs($user);

        return $cartorio;
    }

    public function test_cria_cartorio()
    {
        $this->autenticar();

        $response = $this->postJson('/api/cartorios', [
            'nome' => 'Central',
            'cnpj' => '99999999000199',
            'telefone' => '81988888888',
            'email' => 'central@teste.com',
            'logradouro' => 'Rua B',
            'numero' => '200',
            'bairro' => 'Centro',
            'cidade' => 'Recife',
            'estado' => 'PE',
            'cep' => '50000001',
            'responsavel_nome' => 'Maria',
            'responsavel_cpf' => '22222222222',
        ]);

        $response->assertStatus(201);
    }

    public function test_atualiza_cartorio()
    {
        $cartorio = $this->autenticar();

        $response = $this->putJson("/api/cartorios/{$cartorio->id}", [
            'nome' => 'Cartório Atualizado',
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

        $response->assertStatus(200);
    }

    public function test_exclui_cartorio()
    {
        $cartorio = $this->autenticar();

        $response = $this->deleteJson("/api/cartorios/{$cartorio->id}");

        $response->assertStatus(200);
    }
}