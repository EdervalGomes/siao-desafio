import { useEffect, useState } from 'react'
import axios from 'axios'

function Imoveis() {
  const [imoveis, setImoveis] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)
  const [erro, setErro] = useState('')

  const [formulario, setFormulario] = useState({
    matricula: '',
    valor_avaliacao: '',
    cartorio_id: ''
  })

  useEffect(() => {
    buscarImoveis()
  }, [])

  const buscarImoveis = async () => {
    try {
      const token = localStorage.getItem('token')

      const resposta = await axios.get(
        'http://127.0.0.1:8000/api/imoveis',
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json'
          }
        }
      )

      setImoveis(resposta.data)
      setErro('')

    } catch (error) {
      console.error(error)
      setErro('Erro ao carregar os imóveis.')
    }
  }

  const alterarCampo = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const novoImovel = () => {
    setEditando(null)

    setFormulario({
      matricula: '',
      valor_avaliacao: '',
      cartorio_id: ''
    })

    setErro('')
    setMostrarFormulario(true)
  }

  const editarImovel = (imovel) => {
    setEditando(imovel.id)

    setFormulario({
      matricula: imovel.matricula || '',
      valor_avaliacao: imovel.valor_avaliacao || '',
      cartorio_id: imovel.cartorio_id || ''
    })

    setErro('')
    setMostrarFormulario(true)
  }

  const salvarImovel = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      const dados = {
        matricula: formulario.matricula,
        valor_avaliacao: formulario.valor_avaliacao,
        cartorio_id: formulario.cartorio_id
      }

      if (editando) {
        await axios.put(
          'http://127.0.0.1:8000/api/imoveis/' + editando,
          dados,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
      } else {
        await axios.post(
          'http://127.0.0.1:8000/api/imoveis',
          dados,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
      }

      setMostrarFormulario(false)
      setEditando(null)
      setErro('')

      await buscarImoveis()

    } catch (error) {
      console.error(error)

      if (error.response?.data?.errors) {
        const erros = error.response.data.errors

        const mensagens = Object.values(erros)
          .flat()
          .join(' ')

        setErro(mensagens)

      } else if (error.response?.data?.message) {
        setErro(error.response.data.message)

      } else {
        setErro('Erro ao salvar o imóvel.')
      }
    }
  }

  const excluirImovel = async (id) => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este imóvel?'
    )

    if (!confirmar) {
      return
    }

    try {
      const token = localStorage.getItem('token')

      await axios.delete(
        'http://127.0.0.1:8000/api/imoveis/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json'
          }
        }
      )

      setErro('')

      await buscarImoveis()

    } catch (error) {
      console.error(error)

      if (error.response?.data?.message) {
        setErro(error.response.data.message)
      } else {
        setErro('Erro ao excluir o imóvel.')
      }
    }
  }

  return (
    <div>

      <h1>Imóveis</h1>

      {erro && (
        <p>{erro}</p>
      )}

      <button onClick={novoImovel}>
        Novo Imóvel
      </button>

      <br />
      <br />

      {mostrarFormulario && (
        <form onSubmit={salvarImovel}>

          <h2>
            {editando ? 'Editar Imóvel' : 'Novo Imóvel'}
          </h2>

          <div>
            <label>Matrícula</label>
            <br />

            <input
              type="text"
              name="matricula"
              value={formulario.matricula}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <div>
            <label>Valor de Avaliação</label>
            <br />

            <input
              type="number"
              step="0.01"
              name="valor_avaliacao"
              value={formulario.valor_avaliacao}
              onChange={alterarCampo}
              required
            />
          </div>

          <br />

          <div>
            <label>ID do Cartório</label>
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
            onClick={() => {
              setMostrarFormulario(false)
              setEditando(null)
              setErro('')
            }}
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
            <th>Matrícula</th>
            <th>Valor de Avaliação</th>
            <th>Cartório</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {imoveis.map((imovel) => (

            <tr key={imovel.id}>

              <td>{imovel.id}</td>

              <td>{imovel.matricula}</td>

              <td>
                R$ {Number(imovel.valor_avaliacao).toFixed(2)}
              </td>

              <td>{imovel.cartorio_id}</td>

              <td>

                <button
                  onClick={() => editarImovel(imovel)}
                >
                  Editar
                </button>

                {' '}

                <button
                  onClick={() => excluirImovel(imovel.id)}
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

export default Imoveis