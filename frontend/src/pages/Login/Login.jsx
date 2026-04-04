import React, { useState } from 'react';
import axios from 'axios';
// Trocamos FiArrowLeft por HiOutlineArrowLeft para o visual da seta
import { FiPrinter, FiUser, FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import { HiOutlineArrowLeft } from 'react-icons/hi'; 
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // Estado para controlar se mostra o formulário ou a tela de sucesso
  const [exibirSucesso, setExibirSucesso] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 👉 VERIFICAÇÃO NO BANCO DE DADOS
      const resposta = await axios.post('http://localhost:8080/api/usuarios/login', {
        email: email,
        senha: senha
      });

      console.log("Usuário autenticado:", resposta.data);
      
      // Ativa a tela de confirmação de teste
      setExibirSucesso(true);

    } catch (erro) {
      console.error("Erro no login:", erro);
      alert("Erro ao entrar: E-mail ou senha incorretos.");
    }
  };

  const voltarAoLogin = () => {
    setExibirSucesso(false);
    setEmail('');
    setSenha('');
  };

  return (
    <main className="tela-container">
      <div className="card-interface">
        
        {exibirSucesso ? (
          /* --- TELA DE SUCESSO (TESTE) --- */
          <div style={{ 
            textAlign: 'center', 
            padding: '30px 10px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '20px' 
          }}>
            <FiCheckCircle size={80} color="#378C26" />
            <div>
              <h2 style={{ color: '#378C26', marginBottom: '8px' }}>Login com Sucesso!</h2>
              <p style={{ color: '#666' }}>Esta é uma tela de confirmação de teste.</p>
            </div>

            {/* 👉 BOTÃO ATUALIZADO COM O ESTILO DA IMAGEM */}
            <button 
              onClick={voltarAoLogin}
              className="btn-voltar-login-sucesso"
            >
              {/* Seta azul claro igual a imagem */}
              <HiOutlineArrowLeft className="icone-seta-voltar" /> 
              Voltar ao Login
            </button>
          </div>
        ) : (
          /* --- TELA DE FORMULÁRIO --- */
          <>
            <div className="logo-container">
              <div className="logo-circulo">
                <FiPrinter size={40} color="#ffffff" />
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
                    placeholder="Informe sua matrícula ou e-mail" 
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
                    type={mostrarSenha ? "text" : "password"} 
                    placeholder="Digite sua senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    style={{ paddingRight: '40px' }}
                  />
                  <button 
                    type="button" 
                    className="btn-mostrar-senha" 
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
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
          </>
        )}

      </div>
    </main>
  );
}