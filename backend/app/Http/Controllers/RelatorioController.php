<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class RelatorioController extends Controller
{
    public function imoveisPorCartorio()
    {
        $relatorio = DB::table('cartorios')
            ->leftJoin('imoveis', 'cartorios.id', '=', 'imoveis.cartorio_id')
            ->select(
                'cartorios.id',
                'cartorios.nome',
                DB::raw('COUNT(imoveis.id) as quantidade_imoveis')
            )
            ->groupBy('cartorios.id', 'cartorios.nome')
            ->get();

        return response()->json($relatorio);
    }

    public function valorTotalImoveis()
    {
        $valorTotal = DB::table('imoveis')
            ->sum('valor_avaliacao');

        return response()->json([
            'valor_total' => $valorTotal
        ]);
    }

    public function usuariosPorCartorio()
    {
        $relatorio = DB::table('cartorios')
            ->leftJoin('users', 'cartorios.id', '=', 'users.cartorio_id')
            ->select(
                'cartorios.id',
                'cartorios.nome',
                DB::raw('COUNT(users.id) as quantidade_usuarios')
            )
            ->groupBy('cartorios.id', 'cartorios.nome')
            ->get();

        return response()->json($relatorio);
    }
}