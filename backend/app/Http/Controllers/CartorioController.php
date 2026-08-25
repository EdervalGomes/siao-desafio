<?php

namespace App\Http\Controllers;

use App\Models\Cartorio;
use Illuminate\Http\Request;

class CartorioController extends Controller
{
    public function index()
    {
        return Cartorio::all();
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'nome' => 'required',
            'cnpj' => 'required|unique:cartorios',
            'telefone' => 'required',
            'email' => 'required|email|unique:cartorios',
            'logradouro' => 'required',
            'numero' => 'required|integer',
            'bairro' => 'required',
            'cidade' => 'required',
            'estado' => 'required',
            'cep' => 'required',
            'responsavel_id' => 'nullable|integer',
            'responsavel_nome' => 'required',
            'responsavel_cpf' => 'required',
        ]);

        return Cartorio::create($dados);
    }

    public function show(Cartorio $cartorio)
    {
        return $cartorio;
    }

    public function update(Request $request, Cartorio $cartorio)
    {
        $dados = $request->validate([
            'nome' => 'required',
            'cnpj' => 'required|unique:cartorios,cnpj,' . $cartorio->id,
            'telefone' => 'required',
            'email' => 'required|email|unique:cartorios,email,' . $cartorio->id,
            'logradouro' => 'required',
            'numero' => 'required|integer',
            'bairro' => 'required',
            'cidade' => 'required',
            'estado' => 'required',
            'cep' => 'required',
            'responsavel_id' => 'nullable|integer',
            'responsavel_nome' => 'required',
            'responsavel_cpf' => 'required',
        ]);

        $cartorio->update($dados);

        return $cartorio;
    }

    public function destroy(Cartorio $cartorio)
    {
        $cartorio->delete();

        return response()->json([
            'mensagem' => 'Cartório excluído com sucesso'
        ]);
    }
}