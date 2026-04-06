package com.ufersa.backend_impressoes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "horario_funcionamento")
@Data // Faz a mágica do Lombok: gera todos os Getters, Setters, toString, etc.
@NoArgsConstructor // Construtor vazio (Obrigatório para o JPA/Hibernate funcionar)
@AllArgsConstructor // Construtor com todos os campos (Ótimo para testes e instanciação rápida)
public class HorarioFuncionamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Integer idHorario;

    // @ManyToOne
    // @JoinColumn(name = "id_config")
    // private ConfiguracaoSistema configuracao;
    
    @Column(name = "dia_semana", nullable = false, length = 50)
    private String diaSemana;

    @Column(name = "manha", length = 50)
    private String manha;

    @Column(name = "tarde", length = 50)
    private String tarde;

    @Column(name = "noite", length = 50)
    private String noite;
}