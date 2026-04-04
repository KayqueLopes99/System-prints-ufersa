package com.ufersa.backend_impressoes.service;

import com.ufersa.backend_impressoes.model.Usuario;
import com.ufersa.backend_impressoes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage; // Importação nova para e-mail
import org.springframework.mail.javamail.JavaMailSender; // Importação nova para e-mail
import org.springframework.stereotype.Service;

import java.time.LocalDateTime; // Importação nova para tempo
import java.util.Optional;
import java.util.UUID; // Importação nova para gerar o código do link

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private JavaMailSender mailSender; // <-- Adicionamos o motor de e-mail aqui!

    // 1. autenticarUsuario()
    public Usuario autenticarUsuario(String email, String senhaDigitada) {
        Optional<Usuario> usuarioNoBanco = repository.findByEmail(email);

        if (usuarioNoBanco.isPresent() && usuarioNoBanco.get().getSenha().equals(senhaDigitada)) {
            return usuarioNoBanco.get(); 
        }
        throw new RuntimeException("E-mail ou senha inválidos!");
    }


    // 2. recuperarSenha() - AGORA ENVIA E-MAIL DE VERDADE!
    public void recuperarSenha(String email) {
        Optional<Usuario> usuarioOptional = repository.findByEmail(email);
        
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

            // 1. Gera o código único para o link
            String codigo = UUID.randomUUID().toString();

            // 2. Salva no banco com 30 minutos de validade
            usuario.setCodigoRecuperacao(codigo);
            usuario.setDataExpiracao(LocalDateTime.now().plusMinutes(30));
            repository.save(usuario);

            // 3. Monta a mensagem do e-mail
            SimpleMailMessage mensagem = new SimpleMailMessage();
            mensagem.setFrom("kayquephoto@gmail.com");
            mensagem.setTo(usuario.getEmail());
            mensagem.setSubject("Recuperação de Senha - Sistema UFERSA");
            
            String link = "http://localhost:5173/AtualizarSenha?id=" + codigo;
            
            mensagem.setText("Olá!\n\nVocê solicitou a alteração de senha no sistema.\n" +
                             "Clique no link abaixo para cadastrar uma nova senha:\n\n" + link +
                             "\n\nAtenção: Este link é válido por apenas 30 minutos.");

            // 4. Dispara o e-mail!
            mailSender.send(mensagem);
            
            System.out.println("E-mail enviado com sucesso para: " + email);
            
        } else {
            throw new RuntimeException("E-mail não encontrado no sistema.");
        }
    }


    // 3. alterarSenha()
    public void alterarSenha(String codigo, String novaSenha) {
        // Agora buscamos no banco quem tem esse código de recuperação
        Optional<Usuario> usuarioOptional = repository.findByCodigoRecuperacao(codigo);
        
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

            // VALIDAÇÃO DE SEGURANÇA: Verifica se o link já expirou
            if (usuario.getDataExpiracao().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Este link de recuperação expirou. Solicite um novo e-mail.");
            }

            // Se estiver tudo ok, atualiza a senha
            usuario.setSenha(novaSenha);
            
            // Limpa o código para que o link não possa ser usado duas vezes
            usuario.setCodigoRecuperacao(null);
            usuario.setDataExpiracao(null);
            
            repository.save(usuario);
        } else {
            // Se o código não existir no banco, ele cai aqui
            throw new RuntimeException("Link de recuperação inválido.");
        }
    }

    // 4. cadastrarUsuario()
    public Usuario cadastrarUsuario(Usuario novoUsuario) {

        if (repository.findByEmail(novoUsuario.getEmail()).isPresent()) {
            throw new RuntimeException("Erro: Este e-mail já está em uso!");
        }

        //  Colocar o código para criptografar a senha antes de salvar no banco

        return repository.save(novoUsuario);
    }
}