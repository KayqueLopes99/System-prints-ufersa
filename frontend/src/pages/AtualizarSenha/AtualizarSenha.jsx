import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 👉 Importamos o axios aqui!
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import { MdVpnKey } from 'react-icons/md';
import '../RecuperarSenha/RecuperarSenha.css';

export default function AtualizarSenha() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // 👉 ESTADOS DE ERRO E FEEDBACK
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
  const [sucesso, setSucesso] = useState(false);
  
  // Estado para guardar o token (id) que vem da URL
  const [token, setToken] = useState('');

  // 👉 useEffect roda assim que a tela abre para capturar o id da URL
  useEffect(() => {
    // Exemplo de URL esperada: http://localhost:5173/AtualizarSenha?id=1c482516...
    const parametrosUrl = new URLSearchParams(window.location.search);
    
    // Buscando por 'id' ao invés de 'token'
    const tokenDaUrl = parametrosUrl.get('id'); 
    
    if (tokenDaUrl) {
      setToken(tokenDaUrl);
    }
  }, []);

  const handleChangeSenha = (e) => {
    const value = e.target.value;
    setSenha(value);

    // Validação de tamanho da senha
    if (value.length > 0 && value.length < 8) {
      setErroSenha('A nova senha deve ter no mínimo 8 caracteres');
    } else {
      setErroSenha('');
    }

    // Se o usuário já tiver digitado algo na confirmação, valida se as senhas deixaram de bater
    if (confirmarSenha.length > 0 && value !== confirmarSenha) {
      setErroConfirmarSenha('As senhas não coincidem');
    } else if (confirmarSenha.length > 0 && value === confirmarSenha) {
      setErroConfirmarSenha('');
    }
  };

  const handleChangeConfirmarSenha = (e) => {
    const value = e.target.value;
    setConfirmarSenha(value);

    // Validação se as senhas batem
    if (value.length > 0 && value !== senha) {
      setErroConfirmarSenha('As senhas não coincidem');
    } else {
      setErroConfirmarSenha('');
    }
  };

  const handleAtualizar = async (e) => {
    e.preventDefault();

    // Trava de segurança
    if (erroSenha || erroConfirmarSenha || senha === '' || confirmarSenha === '') {
      alert('Por favor, verifique se as senhas estão corretas e coincidem.');
      return;
    }

    if (!token) {
      alert('Token de recuperação não encontrado. Por favor, acesse o link enviado para o seu e-mail novamente.');
      return;
    }

    try {
      // 👉 Correção 1: Usando axios.put e a URL exata do Java
      await axios.put('http://localhost:8080/api/usuarios/alterar-senha', {
        // 👉 Correção 2: O Java está esperando a palavra "email", então mandamos o nosso token dentro dela
        email: token, 
        novaSenha: senha 
      });

      // Se deu tudo certo no Back-end:
      setSucesso(true);
      setTimeout(() => {
        window.location.href = '/login'; 
      }, 3000);

    } catch (erro) {
      console.error("Erro ao atualizar senha:", erro);
      alert("Erro ao atualizar a senha: " + (erro.response?.data || erro.message));
    }
  };

  return (
    <main className="tela-container">
      <div className="card-interface">
        
        {sucesso ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <FiCheckCircle size={80} color="var(--cor-sucesso, #378C26)" />
            <h2 style={{ color: 'var(--cor-sucesso, #378C26)', margin: 0 }}>Senha Atualizada!</h2>
            <p style={{ color: 'var(--text)', fontSize: '1rem' }}>
              Sua senha foi alterada com sucesso.<br />
              Redirecionando para o login...
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <MdVpnKey 
                size={80} 
                color="var(--cor-primaria, #1A6AA8)" 
                style={{ marginBottom: '16px' }} 
              />
              <h2 style={{ fontSize: '1.8rem', color: '#333', margin: 0 }}>
                Criar Nova Senha
              </h2>
            </div>

            <p className="texto-instrucao" style={{ textAlign: 'center', marginBottom: '24px' }}>
              Digite sua nova senha de acesso. Lembre-se de utilizar no mínimo 8 caracteres.
            </p>

            <form className="formulario" onSubmit={handleAtualizar}>
              
              {/* CAMPO: NOVA SENHA */}
              <div className="grupo-input">
                <label>Nova Senha</label>
                <div className="input-wrapper">
                  <FiLock className="input-icone" size={20} />
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    placeholder="Digite a nova senha" 
                    value={senha}
                    onChange={handleChangeSenha}
                    required
                    style={{ 
                      paddingRight: '40px',
                      borderColor: erroSenha ? '#d32f2f' : undefined 
                    }} 
                  />
                  <button 
                    type="button" 
                    className="btn-mostrar-senha" 
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {erroSenha && (
                  <span style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '2px' }}>
                    {erroSenha}
                  </span>
                )}
              </div>

              {/* CAMPO: CONFIRMAR NOVA SENHA */}
              <div className="grupo-input">
                <label>Confirmar Nova Senha</label>
                <div className="input-wrapper">
                  <FiLock className="input-icone" size={20} />
                  <input 
                    type={mostrarConfirmarSenha ? "text" : "password"} 
                    placeholder="Repita a nova senha" 
                    value={confirmarSenha}
                    onChange={handleChangeConfirmarSenha}
                    required
                    style={{ 
                      paddingRight: '40px',
                      borderColor: erroConfirmarSenha ? '#d32f2f' : undefined 
                    }} 
                  />
                  <button 
                    type="button" 
                    className="btn-mostrar-senha" 
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    title={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarConfirmarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {erroConfirmarSenha && (
                  <span style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '2px' }}>
                    {erroConfirmarSenha}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn-primario" 
                style={{ marginTop: '16px' }}
                disabled={erroSenha !== '' || erroConfirmarSenha !== '' || senha === '' || confirmarSenha === ''}
              >
                Salvar Nova Senha
              </button>
            </form>
          </>
        )}

      </div>
    </main>
  );
}