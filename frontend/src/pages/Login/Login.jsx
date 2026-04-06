import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Trouxemos o FiCheckCircle de volta!
import { FiPrinter, FiUser, FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Voltamos com o estado de sucesso
  const [exibirSucesso, setExibirSucesso] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('http://localhost:8080/api/usuarios/login', {
        email: email.trim(),
        senha: senha.trim()
      });

      console.log("Usuário autenticado:", resposta.data);

      // SALVE O OBJETO INTEIRO PARA O PERFIL USAR
      localStorage.setItem('usuarioLogado', JSON.stringify(resposta.data));
      // Mantém o ID se já usar em outros lugares
      localStorage.setItem('usuarioId', resposta.data.idUsuario);

      setExibirSucesso(true);
      setTimeout(() => { navigate('/estudante'); }, 2000);
    } catch (erro) {
      console.error("Erro no login:", erro);
      // Exibe a mensagem de erro que vem do Java se disponível
      const mensagemErro = erro.response?.data || "E-mail/Matrícula ou senha incorretos.";
      alert("Erro ao entrar: " + mensagemErro);
    }
  };

  return (
    <main className="tela-container">
      <div className="card-interface">

        {exibirSucesso ? (
          /* --- TELA DE SUCESSO COM ANIMAÇÃO --- */
          <div className="container-sucesso">
            <FiCheckCircle className="icone-sucesso-animado" size={80} color="#378C26" />
            <h2 style={{ color: '#378C26', marginTop: '15px' }}>Login com Sucesso!</h2>
            <p style={{ color: '#666', marginTop: '5px' }}>Redirecionando...</p>
          </div>
        ) : (
          /* --- TELA DE FORMULÁRIO PADRÃO --- */
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