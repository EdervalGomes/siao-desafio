import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Relatorios() {
  const [imoveisPorCartorio, setImoveisPorCartorio] = useState([])
  const [usuariosPorCartorio, setUsuariosPorCartorio] = useState([])
  const [valorTotal, setValorTotal] = useState(0)
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarRelatorios()
  }, [])

  const carregarRelatorios = async () => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }

      const respostaImoveis = await axios.get(
        'http://127.0.0.1:8000/api/relatorios/imoveis-por-cartorio',
        config
      )

      const respostaValor = await axios.get(
        'http://127.0.0.1:8000/api/relatorios/valor-total-imoveis',
        config
      )

      const respostaUsuarios = await axios.get(
        'http://127.0.0.1:8000/api/relatorios/usuarios-por-cartorio',
        config
      )

      setImoveisPorCartorio(respostaImoveis.data)
      setValorTotal(respostaValor.data.valor_total)
      setUsuariosPorCartorio(respostaUsuarios.data)

    } catch (error) {
      console.error(error)
      setErro('Erro ao carregar os relatórios.')
    }
  }

  return (
    <div>

      <h1>Relatórios</h1>

      {erro && (
        <p>{erro}</p>
      )}

      <h2>Valor Total dos Imóveis</h2>

      <h3>
        R$ {Number(valorTotal).toLocaleString('pt-BR', {
          minimumFractionDigits: 2
        })}
      </h3>

      <br />

      <h2>Imóveis por Cartório</h2>

      <div style={{ width: '100%', height: 350 }}>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={imoveisPorCartorio}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="nome" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="quantidade_imoveis"
              name="Imóveis"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <br />

      <h2>Imóveis por Cartório - Tabela</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Cartório</th>
            <th>Quantidade de Imóveis</th>
          </tr>
        </thead>

        <tbody>

          {imoveisPorCartorio.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.nome}</td>

              <td>{item.quantidade_imoveis}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <h2>Usuários por Cartório</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Cartório</th>
            <th>Quantidade de Usuários</th>
          </tr>
        </thead>

        <tbody>

          {usuariosPorCartorio.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.nome}</td>

              <td>{item.quantidade_usuarios}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Relatorios