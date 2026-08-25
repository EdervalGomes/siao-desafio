<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartorioController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ImovelController;
use App\Http\Controllers\RelatorioController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('cartorios', CartorioController::class);

    Route::apiResource('usuarios', UsuarioController::class);

    Route::apiResource('imoveis', ImovelController::class);

    Route::get('/relatorios/imoveis-por-cartorio', [RelatorioController::class, 'imoveisPorCartorio']);

    Route::get('/relatorios/valor-total-imoveis', [RelatorioController::class, 'valorTotalImoveis']);

    Route::get('/relatorios/usuarios-por-cartorio', [RelatorioController::class, 'usuariosPorCartorio']);

});