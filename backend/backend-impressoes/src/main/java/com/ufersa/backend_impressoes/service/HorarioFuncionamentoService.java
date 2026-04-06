package com.ufersa.backend_impressoes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.ufersa.backend_impressoes.repository.HorarioFuncionamentoRepository;
import com.ufersa.backend_impressoes.repository.UsuarioRepository;
import com.ufersa.backend_impressoes.model.HorarioFuncionamento;


@Service
public class HorarioFuncionamentoService {

    @Autowired
    private HorarioFuncionamentoRepository repository;

    // Este método implementa o 'obterQuadroHorariosCompleto' do teu diagrama UML
    public List<HorarioFuncionamento> listarTodos() {
        return repository.findAll();
    }
}
