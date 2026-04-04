package com.ufersa.backend_impressoes.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_usuario", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private int idUsuario;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "preferencias_notificacao", nullable = false, columnDefinition = "boolean default true")
    private Boolean preferenciasNotificacao = true;

    @Column(name = "modo_escuro", nullable = false, columnDefinition = "boolean default false")
    private Boolean modoEscuro = false;

    @Column(name = "codigo_recuperacao")
    private String codigoRecuperacao;

    @Column(name = "data_expiracao")
    private LocalDateTime dataExpiracao;
}