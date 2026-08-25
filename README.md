# Sião - Sistema de Gestão de Cartórios

Sistema desenvolvido para gerenciamento de cartórios, usuários e imóveis, com API em Laravel e frontend em React.

## Tecnologias

* PHP
* Laravel
* MySQL
* Laravel Sanctum
* React
* Vite
* Axios
* Recharts
* Swagger / OpenAPI
* PHPUnit

## Funcionalidades

* Login e autenticação de usuários
* Cadastro, edição e exclusão de cartórios
* Cadastro, edição e exclusão de usuários
* Cadastro, edição e exclusão de imóveis
* Relatório de imóveis por cartório
* Relatório de valor total dos imóveis
* Relatório de usuários por cartório
* Gráfico de imóveis por cartório
* Documentação da API com Swagger
* Testes automatizados

## Estrutura do Projeto

```text
siao-desafio/
│
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── tests/
│   └── ...
│
├── frontend/
│   ├── src/
│   └── ...
│
├── README.md
└── .gitignore
```

## Instalação

### Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
composer install
```

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Gere a chave da aplicação:

```bash
php artisan key:generate
```

Configure no arquivo `.env` os dados do banco de dados MySQL.

Execute as migrations:

```bash
php artisan migrate
```

Inicie o servidor Laravel:

```bash
php artisan serve
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

## Frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor React:

```bash
npm run dev
```

O endereço do frontend será informado pelo Vite no terminal.

## Login

O sistema possui autenticação utilizando Laravel Sanctum.

O endpoint de login é:

```text
POST /api/login
```

Exemplo de credenciais utilizadas durante o desenvolvimento:

```text
E-mail: admin@teste.com
Senha: 123456
```

## Cartórios

O sistema permite:

* cadastrar cartórios;
* visualizar cartórios;
* editar cartórios;
* excluir cartórios.

## Usuários

O sistema permite:

* cadastrar usuários;
* visualizar usuários;
* editar usuários;
* excluir usuários;
* vincular usuários a cartórios.

## Imóveis

O sistema permite:

* cadastrar imóveis;
* visualizar imóveis;
* editar imóveis;
* excluir imóveis;
* vincular imóveis a cartórios.

Os imóveis possuem informações como:

* matrícula;
* proprietário;
* valor;
* status.

## Relatórios

O sistema possui um módulo de relatórios com:

### Imóveis por cartório

Apresenta a quantidade de imóveis cadastrados em cada cartório.

### Valor total dos imóveis

Apresenta a soma dos valores de avaliação dos imóveis cadastrados.

### Usuários por cartório

Apresenta a quantidade de usuários vinculados a cada cartório.

### Gráfico

O sistema apresenta um gráfico de barras com a quantidade de imóveis por cartório.

## Documentação da API

A API possui documentação utilizando Swagger/OpenAPI.

Com o backend em execução, acesse:

```text
http://127.0.0.1:8000/docs
```

A documentação apresenta os principais endpoints da API.

## Testes

Os testes automatizados podem ser executados com:

```bash
cd backend
php artisan test
```

Os testes implementados verificam funcionalidades como:

* login;
* criação de cartório;
* atualização de cartório;
* exclusão de cartório.

Resultado dos testes durante o desenvolvimento:

```text
6 testes passaram
7 assertions
```

## API

Principais endpoints:

```text
POST   /api/login

GET    /api/cartorios
POST   /api/cartorios
GET    /api/cartorios/{id}
PUT    /api/cartorios/{id}
DELETE /api/cartorios/{id}

GET    /api/usuarios
POST   /api/usuarios
GET    /api/usuarios/{id}
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}

GET    /api/imoveis
POST   /api/imoveis
GET    /api/imoveis/{id}
PUT    /api/imoveis/{id}
DELETE /api/imoveis/{id}

GET    /api/relatorios/imoveis-por-cartorio
GET    /api/relatorios/valor-total-imoveis
GET    /api/relatorios/usuarios-por-cartorio
```

## Segurança

As rotas protegidas da API utilizam autenticação através do Laravel Sanctum.

O token de autenticação é enviado nas requisições utilizando o header:

```text
Authorization: Bearer TOKEN
```

## Execução Local

Para executar o projeto localmente, mantenha o backend e o frontend rodando em terminais separados.

### Backend

```bash
cd backend
php artisan serve
```

### Frontend

```bash
cd frontend
npm run dev
```
