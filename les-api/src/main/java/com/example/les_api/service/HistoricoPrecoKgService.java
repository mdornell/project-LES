package com.example.les_api.service;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.example.les_api.domain.produto.Produto;
import com.example.les_api.dto.HistoricoPrecoKgDTO;
import com.example.les_api.repository.HistoricoPrecoKgRepository;
import com.example.les_api.repository.ProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HistoricoPrecoKgService {

    private final HistoricoPrecoKgRepository repository;
    private final ProdutoRepository produtoRepository;

    public List<HistoricoPrecoKgDTO> listarTodos() {
        return repository.findAll().stream().map(HistoricoPrecoKgDTO::new).collect(Collectors.toList());
    }

    public List<HistoricoPrecoKgDTO> listarPorProduto(Integer produtoId) {
        return repository.findByProdutoId(produtoId).stream().map(HistoricoPrecoKgDTO::new).collect(Collectors.toList());
    }

    public HistoricoPrecoKgDTO salvar(Integer produtoId, Double precoKg) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        HistoricoPrecoKg historico = new HistoricoPrecoKg();
        historico.setProduto(produto);
        historico.setPrecoKg(precoKg);
        historico.setDataRegistro(new Date());

        return new HistoricoPrecoKgDTO(repository.save(historico));
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
