import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  const login = async (e) => {
    e.preventDefault()

    setErro('')

    try {
      const resposta = await axios.post(
        'http://127.0.0.1:8000/api/login',
        {
          email: email,
          password: password
        }
      )

      localStorage.setItem('token', resposta.data.token)

      alert('Login realizado com sucesso!')

      console.log('Token:', resposta.data.token)

    } catch (error) {
      console.error(error)

      if (error.response?.status === 401) {
        setErro('E-mail ou senha inválidos.')
      } else {
        setErro('Erro ao conectar com o servidor.')
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={login}>

        <div>
          <label>E-mail</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <br />

        <div>
          <label>Senha</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <br />

        <button type="submit">
          Entrar
        </button>

      </form>

      {erro && (
        <p>{erro}</p>
      )}
    </div>
  )
}

export default Login