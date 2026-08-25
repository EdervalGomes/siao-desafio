import { useState } from 'react'
import axios from 'axios'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  const fazerLogin = async (e) => {
    e.preventDefault()

    try {
      setErro('')

      const resposta = await axios.post(
        'http://127.0.0.1:8000/api/login',
        {
          email: email,
          password: password
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      localStorage.setItem('token', resposta.data.token)

      onLogin()

    } catch (error) {
      console.error(error)

      if (error.response?.data?.erro) {
        setErro(error.response.data.erro)
      } else {
        setErro('E-mail ou senha inválidos.')
      }
    }
  }

  return (
    <div>

      <h1>Login</h1>

      {erro && (
        <p>{erro}</p>
      )}

      <form onSubmit={fazerLogin}>

        <div>
          <label>E-mail</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />
        </div>

        <br />

        <button type="submit">
          Entrar
        </button>

      </form>

    </div>
  )
}

export default Login