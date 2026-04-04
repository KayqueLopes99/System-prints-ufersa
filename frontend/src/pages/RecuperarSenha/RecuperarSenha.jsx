import React, { useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import './RecuperarSenha.css';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');

  const handleRecuperar = (e) => {
    e.preventDefault();
    console.log("Pedindo recuperação para:", email);
  };

  return (
    <main className="tela-container">
      <div className="card-interface">
        
        <div className="cabecalho-simples">
          <button className="btn-voltar" onClick={() => window.history.back()} title="Voltar">
            <FiArrowLeft size={24} />
          </button>
          <h2>Recuperar Senha</h2>
        </div>

        <p className="texto-instrucao">
          Insira seu e-mail institucional. Enviaremos um link para você redefinir sua senha.
        </p>

        <form className="formulario" onSubmit={handleRecuperar}>
          <div className="grupo-input">
            <label>E-mail Cadastrado</label>
            <div className="input-wrapper">
              <FiMail className="input-icone" size={20} />
              <input 
                type="email" 
                placeholder="Ex: nome@alunos.ufersa.edu.br" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primario" style={{ marginTop: '10px' }}>
            Enviar Link
          </button>
        </form>

      </div>
    </main>
  );
}