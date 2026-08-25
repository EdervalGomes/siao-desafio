<?php

namespace App\Http\Controllers;

use App\Models\Imovel;
use Illuminate\Http\Request;

class ImovelController extends Controller
{
    public function index()
    {
        return Imovel::all();
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'matricula' => 'required|unique:imoveis',
            'valor_avaliacao' => 'required|numeric',
            'cartorio_id' => 'required|exists:cartorios,id',
        ]);

        return Imovel::create($dados);
    }

    public function show(Imovel $imovel)
    {
        return $imovel;
    }

    public function update(Request $request, Imovel $imovel)
    {
        $dados = $request->validate([
            'matricula' => 'required|unique:imoveis,matricula,' . $imovel->id,
            'valor_avaliacao' => 'required|numeric',
            'cartorio_id' => 'required|exists:cartorios,id',
        ]);

        $imovel->update($dados);

        return $imovel;
    }

    public function destroy(Imovel $imovel)
    {
        $imovel->delete();

        return response()->json([
            'mensagem' => 'Imóvel excluído com sucesso'
        ]);
    }
}