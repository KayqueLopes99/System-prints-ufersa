import React, { useState } from 'react';
import { FiPrinter, FiUser, FiLock } from 'react-icons/fi';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentando logar:", { email, senha });
    // Futuramente aqui vai o axios.post para o login no banco
  };

  return (
    <main className="tela-container">
      <div className="card-interface">
        
        <div className="logo-container">
          <div className="logo-circulo">
            <FiPrinter size={40} color="var(--cor-branca, #ffffff)" />
          </div>
          <h1>Xerox UFERSA</h1>
        </div>

        <div className="boas-vindas">
          <h2>Bem-vindo(a) estudante</h2>
          <p>Digite seu acesso</p>
        </div>

        <form className="formulario" onSubmit={handleLogin}>
          <div className="grupo-input">
            <label>E-mail ou Matrícula</label>
            <div className="input-wrapper">
              <FiUser className="input-icone" size={20} />
              <input 
                type="text" 
                placeholder="Ex: 20230111115" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grupo-input">
            <label>Senha</label>
            <div className="input-wrapper">
              <FiLock className="input-icone" size={20} />
              <input 
                type="password" 
                placeholder="Digite sua senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="opcoes-extras">
            <label className="checkbox-label">
              <input type="checkbox" /> Lembrar de mim
            </label>
            <a href="/recuperar-senha" className="link-destaque">Esqueci a senha</a>
          </div>

          <button type="submit" className="btn-primario">ENTRAR</button>
        </form>

        <p className="rodape-link">
          Não tem uma conta? <a href="/cadastro" className="link-destaque">Cadastre-se</a>
        </p>

      </div>
    </main>
  );
}