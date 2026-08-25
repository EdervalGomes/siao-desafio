import { useEffect, useState } from 'react'
import axios from 'axios'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)
  const [erro, setErro] = useState('')

  const [formulario, setFormulario] = useState({
    name: '',
    cpf: '',
    email: '',
    telefone: '',
    cartorio_id: ''
  })

  useEffect(() => {
    buscarUsuarios()
  }, [])

  const buscarUsuarios = async () => {
    try {
      const token = localStorage.getItem('token')

      const resposta = await axios.get(
        'http://127.0.0.1:8000/api/usuarios',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )

      setUsuarios(resposta.data)

    } catch (error) {
      console.error(error)
      setErro('Erro ao carregar os usuários.')
    }
  }

  const alterarCampo = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const novoUsuario = () => {
    setEditando(null)

    setFormulario({
      name: '',
      cpf: '',
      email: '',
      telefone: '',
      cartorio_id: ''
    })

    setMostrarFormulario(true)
  }

  const editarUsuario = (usuario) => {
    setEditando(usuario.id)

    setFormulario({
      name: usuario.name || '',
      cpf: usuario.cpf || '',
      email: usuario.email || '',
      telefone: usuario.telefone || '',
      cartorio_id: usuario.cartorio_id || ''
    })

    setMostrarFormulario(true)
  }

  const salvarUsuario = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      if (editando) {
        await axios.put(
          `http://127.0.0.1:8000/api/usuarios/${editando}`,
          formulario,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          }
        )
      } else {
        await axios.post(
          'http://127.0.0.1:8000/api/usuarios',
          formulario,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          }
        )
      }

      setMostrarFormulario(false)
      setEditando(null)

      buscarUsuarios()

    } catch (error) {
      console.error(error)

      if (error.response?.data?.message) {
        setErro(error.response.data.message)
      } else {
        setErro('Erro ao salvar o usuário.')
      }
    }
  }

  const excluirUsuario = async (id) => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este usuário?'
    )

    if (!confirmar) {
      return
    }

    try {
      const token = localStorage.getItem('token')

      await axios.delete(
        `http://127.0.0.1:8000/api/usuarios/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )

      buscarUsuarios()

    } catch (error) {
      console.error(error)
      setErro('Erro ao excluir o usuário.')
    }
  }

  return (
    <div>

      <h1>Usuários</h1>

      {erro && (
        <p>{erro}</p>
      )}

      <button onClick={novoUsuario}>
        Novo Usuário
      </button>

      <br />
      <br />

      {mostrarFormulario && (
        <form onSubmit={salvarUsuario}>

          <h2>
            {editando ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>

          <div>
            <label>Nome</label>
            <br />

            <input
              name="name"
              value={formulario.name}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <div>
            <label>CPF</label>
            <br />

            <input
              name="cpf"
              value={formulario.cpf}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <div>
            <label>E-mail</label>
            <br />

            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <div>
            <label>Telefone</label>
            <br />

            <input
              name="telefone"
              value={formulario.telefone}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Cartório</label>
            <br />

            <input
              type="number"
              name="cartorio_id"
              value={formulario.cartorio_id}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <button type="submit">
            {editando ? 'Atualizar' : 'Cadastrar'}
          </button>

          {' '}

          <button
            type="button"
            onClick={() => setMostrarFormulario(false)}
          >
            Cancelar
          </button>

        </form>
      )}

      <br />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Cartório</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr key={usuario.id}>

              <td>{usuario.id}</td>

              <td>{usuario.name}</td>

              <td>{usuario.cpf}</td>

              <td>{usuario.email}</td>

              <td>{usuario.telefone}</td>

              <td>{usuario.cartorio_id}</td>

              <td>

                <button
                  onClick={() => editarUsuario(usuario)}
                >
                  Editar
                </button>

                {' '}

                <button
                  onClick={() => excluirUsuario(usuario.id)}
                >
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Usuarios