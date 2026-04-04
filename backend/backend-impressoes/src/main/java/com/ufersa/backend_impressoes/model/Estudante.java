package com.ufersa.backend_impressoes.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@DiscriminatorValue("ESTUDANTE")
@Data
@EqualsAndHashCode(callSuper = true)
public class Estudante extends Usuario {

    @Column(unique = true, length = 10)
    private String matricula;

    @Column(length = 100)
    private String curso;

}