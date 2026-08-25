import { useEffect, useState } from 'react'
import axios from 'axios'

function Cartorios() {
  const [cartorios, setCartorios] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)
  const [erro, setErro] = useState('')

  const [formulario, setFormulario] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    responsavel_id: '',
    responsavel_nome: '',
    responsavel_cpf: ''
  })

  useEffect(() => {
    buscarCartorios()
  }, [])

  const buscarCartorios = async () => {
    try {
      const token = localStorage.getItem('token')

      const resposta = await axios.get(
        'http://127.0.0.1:8000/api/cartorios',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )

      setCartorios(resposta.data)

    } catch (error) {
      console.error(error)
      setErro('Erro ao carregar os cartórios.')
    }
  }

  const alterarCampo = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const novoCartorio = () => {
    setEditando(null)

    setFormulario({
      nome: '',
      cnpj: '',
      telefone: '',
      email: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      responsavel_id: '',
      responsavel_nome: '',
      responsavel_cpf: ''
    })

    setMostrarFormulario(true)
  }

  const editarCartorio = (cartorio) => {
    setEditando(cartorio.id)

    setFormulario({
      nome: cartorio.nome || '',
      cnpj: cartorio.cnpj || '',
      telefone: cartorio.telefone || '',
      email: cartorio.email || '',
      logradouro: cartorio.logradouro || '',
      numero: cartorio.numero || '',
      bairro: cartorio.bairro || '',
      cidade: cartorio.cidade || '',
      estado: cartorio.estado || '',
      cep: cartorio.cep || '',
      responsavel_id: cartorio.responsavel_id || '',
      responsavel_nome: cartorio.responsavel_nome || '',
      responsavel_cpf: cartorio.responsavel_cpf || ''
    })

    setMostrarFormulario(true)
  }

  const salvarCartorio = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      if (editando) {
        await axios.put(
          `http://127.0.0.1:8000/api/cartorios/${editando}`,
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
          'http://127.0.0.1:8000/api/cartorios',
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

      buscarCartorios()

    } catch (error) {
      console.error(error)

      if (error.response?.data?.message) {
        setErro(error.response.data.message)
      } else {
        setErro('Erro ao salvar o cartório.')
      }
    }
  }

  const excluirCartorio = async (id) => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este cartório?'
    )

    if (!confirmar) {
      return
    }

    try {
      const token = localStorage.getItem('token')

      await axios.delete(
        `http://127.0.0.1:8000/api/cartorios/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )

      buscarCartorios()

    } catch (error) {
      console.error(error)
      setErro('Erro ao excluir o cartório.')
    }
  }

  return (
    <div>

      <h1>Cartórios</h1>

      {erro && (
        <p>{erro}</p>
      )}

      <button onClick={novoCartorio}>
        Novo Cartório
      </button>

      <br />
      <br />

      {mostrarFormulario && (
        <form onSubmit={salvarCartorio}>

          <h2>
            {editando ? 'Editar Cartório' : 'Novo Cartório'}
          </h2>

          <div>
            <label>Nome</label>
            <br />

            <input
              name="nome"
              value={formulario.nome}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <div>
            <label>CNPJ</label>
            <br />

            <input
              name="cnpj"
              value={formulario.cnpj}
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
            <label>E-mail</label>
            <br />

            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Logradouro</label>
            <br />

            <input
              name="logradouro"
              value={formulario.logradouro}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Número</label>
            <br />

            <input
              name="numero"
              value={formulario.numero}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Bairro</label>
            <br />

            <input
              name="bairro"
              value={formulario.bairro}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Cidade</label>
            <br />

            <input
              name="cidade"
              value={formulario.cidade}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Estado</label>
            <br />

            <input
              name="estado"
              value={formulario.estado}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>CEP</label>
            <br />

            <input
              name="cep"
              value={formulario.cep}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>ID do responsável</label>
            <br />

            <input
              name="responsavel_id"
              value={formulario.responsavel_id}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>Nome do responsável</label>
            <br />

            <input
              name="responsavel_nome"
              value={formulario.responsavel_nome}
              onChange={alterarCampo}
            />
          </div>

          <br />

          <div>
            <label>CPF do responsável</label>
            <br />

            <input
              name="responsavel_cpf"
              value={formulario.responsavel_cpf}
              onChange={alterarCampo}
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
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {cartorios.map((cartorio) => (

            <tr key={cartorio.id}>

              <td>{cartorio.id}</td>

              <td>{cartorio.nome}</td>

              <td>{cartorio.cnpj}</td>

              <td>{cartorio.telefone}</td>

              <td>{cartorio.email}</td>

              <td>

                <button
                  onClick={() => editarCartorio(cartorio)}
                >
                  Editar
                </button>

                {' '}

                <button
                  onClick={() => excluirCartorio(cartorio.id)}
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

export default Cartorios