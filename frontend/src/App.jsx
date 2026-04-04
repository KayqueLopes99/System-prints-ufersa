import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando as telas que acabamos de criar!
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal: Quando o site abrir ( / ), mostra o Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota de Cadastro: Quando for /cadastro, mostra a tela de Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota de Recuperar Senha: Quando for /recuperar-senha, mostra a tela */}
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Routes>
    </Router>
  );
}