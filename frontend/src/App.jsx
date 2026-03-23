import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa'; // 1. IMPORTAMOS O ÍCONE AQUI
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <div style={{ textAlign: 'center', marginTop: '20vh' }}>
              
              {/* 2. USAMOS O ÍCONE AQUI, COMO SE FOSSE UMA TAG HTML */}
              <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <FaPrint size={40} color="#2688d4" /> Xerox UFERSA
              </h1>
              
              <p>Bem-vindo ao Sistema de Gerenciamento de Impressões!</p>
              <p style={{ color: '#2688d4' }}>Seu Front-End React está configurado e pronto para uso.</p>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;