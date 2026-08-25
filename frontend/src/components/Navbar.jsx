function Navbar({ pagina, setPagina, sair }) {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 30px',
      borderBottom: '1px solid #ddd',
      background: '#f5f5f5'
    }}>

      <h2 style={{ margin: 0 }}>
        Sião
      </h2>

      <div style={{
        display: 'flex',
        gap: '10px'
      }}>

        <button
          onClick={() => setPagina('cartorios')}
          style={{
            fontWeight: pagina === 'cartorios' ? 'bold' : 'normal'
          }}
        >
          Cartórios
        </button>

        <button
          onClick={() => setPagina('usuarios')}
          style={{
            fontWeight: pagina === 'usuarios' ? 'bold' : 'normal'
          }}
        >
          Usuários
        </button>

        <button
          onClick={() => setPagina('imoveis')}
          style={{
            fontWeight: pagina === 'imoveis' ? 'bold' : 'normal'
          }}
        >
          Imóveis
        </button>

        <button
          onClick={() => setPagina('relatorios')}
          style={{
            fontWeight: pagina === 'relatorios' ? 'bold' : 'normal'
          }}
        >
          Relatórios
        </button>

        <button onClick={sair}>
          Sair
        </button>

      </div>

    </nav>
  )
}

export default Navbar