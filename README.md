# Sião - Sistema de Gestão de Cartórios

Sistema desenvolvido para gerenciamento de cartórios, usuários e imóveis, com API em Laravel e frontend em React.

## Tecnologias

* Laravel
* PHP
* MySQL
* Laravel Sanctum
* React
* Vite
* Axios
* Recharts

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

Configure no `.env` os dados do banco de dados MySQL.

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

### Frontend

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

O frontend ficará disponível no endereço informado pelo Vite.

## Funcionalidades

* Login com autenticação Laravel Sanctum
* Cadastro, edição e exclusão de cartórios
* Cadastro, edição e exclusão de usuários
* Cadastro, edição e exclusão de imóveis
* Relatórios de imóveis por cartório
* Relatório de valor total dos imóveis
* Relatório de usuários por cartório
* Gráfico de imóveis por cartório
* Testes automatizados

## Testes

Para executar os testes do backend:

```bash
cd backend
php artisan test
```

## Docker

O projeto possui a etapa de Docker prevista como ponto extra, porém a execução local foi utilizada como alternativa devido à indisponibilidade de virtualização no ambiente de desenvolvimento.

## Execução

Para executar o sistema localmente, mantenha o backend e o frontend rodando em terminais separados:

**Backend:**

```bash
cd backend
php artisan serve
```

**Frontend:**

```bash
cd frontend
npm run dev
```
