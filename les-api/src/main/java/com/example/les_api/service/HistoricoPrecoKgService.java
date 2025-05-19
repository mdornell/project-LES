package com.example.les_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.example.les_api.dto.HistoricoPrecoKgDTO;
import com.example.les_api.repository.HistoricoPrecoKgRepository;
import com.example.les_api.repository.ProdutoRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoricoPrecoKgService {

    private final HistoricoPrecoKgRepository repository;
    private final ProdutoRepository produtoRepository;

    public List<HistoricoPrecoKgDTO> listarTodos() {
        return repository.findAll().stream().map(HistoricoPrecoKgDTO::new).collect(Collectors.toList());
    }

    public HistoricoPrecoKgDTO buscarPorId(Integer id) {
        HistoricoPrecoKg historico = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico de preço não encontrado"));
        return new HistoricoPrecoKgDTO(historico);
    }

    public HistoricoPrecoKgDTO salvar(HistoricoPrecoKg historico) {
        return new HistoricoPrecoKgDTO(repository.save(historico));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
