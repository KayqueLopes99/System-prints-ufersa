package com.ufersa.backend_impressoes.service;

import com.ufersa.backend_impressoes.model.Usuario;
import com.ufersa.backend_impressoes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    // 1. autenticarUsuario()
    public Usuario autenticarUsuario(String email, String senhaDigitada) {
        Optional<Usuario> usuarioNoBanco = repository.findByEmail(email);

        if (usuarioNoBanco.isPresent() && usuarioNoBanco.get().getSenha().equals(senhaDigitada)) {
            return usuarioNoBanco.get(); 
        }
        throw new RuntimeException("E-mail ou senha inválidos!");
    }


    // 2. recuperarSenha()
    public void recuperarSenha(String email) {
        Optional<Usuario> usuario = repository.findByEmail(email);
        
        if (usuario.isPresent()) {
            // Gera um código fake de 6 letras/números para teste
            String tokenTeste = java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
            
            System.out.println("\n========================================");
            System.out.println("[MODO TESTE] RECUPERAÇÃO DE SENHA");
            System.out.println("E-mail alvo: " + email);
            System.out.println("CÓDIGO DE RECUPERAÇÃO: " + tokenTeste);
            System.out.println("========================================\n");
            
        } else {
            throw new RuntimeException("E-mail não encontrado no sistema.");
        }
    }


    // 3. alterarSenha()
    public void alterarSenha(String email, String novaSenha) {
        Optional<Usuario> usuarioOptional = repository.findByEmail(email);
        
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setSenha(novaSenha);
            repository.save(usuario);
        } else {
            throw new RuntimeException("Usuário não encontrado.");
        }
    }

    public Usuario cadastrarUsuario(Usuario novoUsuario) {

        if (repository.findByEmail(novoUsuario.getEmail()).isPresent()) {
            throw new RuntimeException("Erro: Este e-mail já está em uso!");
        }

        // Futuramente, Colocar o código para criptografar a senha antes de salvar no banco!

        return repository.save(novoUsuario);
    }
}