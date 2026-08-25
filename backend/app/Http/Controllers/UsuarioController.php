<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        return Usuario::all();
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'cartorio_id' => 'required|exists:cartorios,id',
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $dados['password'] = Hash::make($dados['password']);

        return Usuario::create($dados);
    }

    public function show(Usuario $usuario)
    {
        return $usuario;
    }

    public function update(Request $request, Usuario $usuario)
    {
        $dados = $request->validate([
            'cartorio_id' => 'required|exists:cartorios,id',
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $usuario->id,
            'password' => 'nullable|min:6',
        ]);

        if (!empty($dados['password'])) {
            $dados['password'] = Hash::make($dados['password']);
        } else {
            unset($dados['password']);
        }

        $usuario->update($dados);

        return $usuario;
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return response()->json([
            'mensagem' => 'Usuário excluído com sucesso'
        ]);
    }
}