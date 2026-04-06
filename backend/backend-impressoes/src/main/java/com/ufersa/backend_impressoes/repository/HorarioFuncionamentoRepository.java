package com.ufersa.backend_impressoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ufersa.backend_impressoes.model.HorarioFuncionamento;

@Repository
public interface HorarioFuncionamentoRepository extends JpaRepository<HorarioFuncionamento, Integer> {
}