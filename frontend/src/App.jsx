import { useState } from 'react'

import Login from './pages/Login'
import Cartorios from './pages/Cartorios'
import Usuarios from './pages/Usuarios'
import Imoveis from './pages/Imoveis'
import Relatorios from './pages/Relatorios'
import Navbar from './components/Navbar'

function App() {
  const [logado, setLogado] = useState(
    !!localStorage.getItem('token')
  )

  const [pagina, setPagina] = useState('relatorios')

  const entrar = () => {
    setLogado(true)
    setPagina('relatorios')
  }

  const sair = () => {
    localStorage.removeItem('token')
    setLogado(false)
  }

  if (!logado) {
    return <Login onLogin={entrar} />
  }

  return (
    <div>

      <Navbar
        pagina={pagina}
        setPagina={setPagina}
        sair={sair}
      />

      <main style={{
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        {pagina === 'cartorios' && (
          <Cartorios />
        )}

        {pagina === 'usuarios' && (
          <Usuarios />
        )}

        {pagina === 'imoveis' && (
          <Imoveis />
        )}

        {pagina === 'relatorios' && (
          <Relatorios />
        )}

      </main>

    </div>
  )
}

export default App