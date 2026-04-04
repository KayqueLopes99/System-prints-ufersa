import React, { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCreditCard } from 'react-icons/fi';
import axios from 'axios';
import './Cadastro.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    
    const dadosParaEnviar = {
      nomeCompleto: formData.nome,
      email: formData.email,
      senha: formData.senha,
      matricula: formData.matricula,
      curso: "Não informado"
    };

    try {
      await axios.post('http://localhost:8080/api/usuarios/cadastrar/estudante', dadosParaEnviar);
      alert("Sucesso! Estudante cadastrado no banco de dados.");
      window.location.href = '/';
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar: " + (erro.response?.data || erro.message));
    }
  };

  return (
    <main className="tela-container">
      <div className="card-interface">
        
        <div className="cabecalho-simples">
          <button className="btn-voltar" onClick={() => window.history.back()} title="Voltar">
            <FiArrowLeft size={24} />
          </button>
          <h2>Criar Conta</h2>
        </div>

        <p className="texto-instrucao">
          Preencha os dados para acessar o sistema de impressão.
        </p>

        <form className="formulario" onSubmit={handleCadastro}>
          <div className="grupo-input">
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <FiUser className="input-icone" size={20} />
              <input 
                type="text" 
                name="nome"
                placeholder="Ex: José Kayque Lima Lopes" 
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grupo-input">
            <label>Matrícula</label>
            <div className="input-wrapper">
              <FiCreditCard className="input-icone" size={20} />
              <input 
                type="text" 
                name="matricula"
                placeholder="20230111115" 
                value={formData.matricula}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grupo-input">
            <label>E-mail Institucional</label>
            <div className="input-wrapper">
              <FiMail className="input-icone" size={20} />
              <input 
                type="email" 
                name="email"
                placeholder="lkinho@alunos.ufersa.edu.br" 
                value={formData.email}
                onChange={handleChange}
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
                name="senha"
                placeholder="Mínimo de 8 caracteres" 
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primario" style={{ marginTop: '16px' }}>
            Finalizar Cadastro
          </button>
        </form>

      </div>
    </main>
  );
}