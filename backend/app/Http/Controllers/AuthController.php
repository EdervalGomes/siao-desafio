<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;

class AuthController extends Controller
{
    #[OA\Post(
        path: '/api/login',
        summary: 'Realizar login',
        description: 'Autentica o usuário e retorna um token Sanctum.',
        tags: ['Autenticação'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(
                        property: 'email',
                        type: 'string',
                        format: 'email',
                        example: 'admin@teste.com'
                    ),
                    new OA\Property(
                        property: 'password',
                        type: 'string',
                        format: 'password',
                        example: '123456'
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Login realizado com sucesso'
            ),
            new OA\Response(
                response: 401,
                description: 'Credenciais inválidas'
            )
        ]
    )]
    public function login(Request $request)
    {
        $credenciais = $request->only('email', 'password');

        if (!Auth::attempt($credenciais)) {
            return response()->json([
                'erro' => 'Credenciais inválidas'
            ], 401);
        }

        $token = $request->user()->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }
}