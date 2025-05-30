package com.example.les_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.les_api.domain.fornecedor.Fornecedor;
import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.example.les_api.dto.PagamentoFornecedorDTO;
import com.example.les_api.repository.FornecedorRepository;
import com.example.les_api.repository.PagamentoFornecedorRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PagamentoFornecedorService {

    private final PagamentoFornecedorRepository repository;
    private final FornecedorRepository fornecedorRepository;

    public List<PagamentoFornecedorDTO> listarTodos() {
        return repository.findAll().stream().map(PagamentoFornecedorDTO::new).collect(Collectors.toList());
    }

    public PagamentoFornecedorDTO buscarPorId(Integer id) {
        return new PagamentoFornecedorDTO(repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pagamento não encontrado")));
    }

    public PagamentoFornecedorDTO salvar(PagamentoFornecedor pagamento, Integer fornecedorId) {
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
        pagamento.setFornecedor(fornecedor);
        return new PagamentoFornecedorDTO(repository.save(pagamento));
    }

    public PagamentoFornecedorDTO atualizar(Integer id, PagamentoFornecedor atualizado) {
        PagamentoFornecedor pagamento = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));

        pagamento.setDescricao(atualizado.getDescricao());
        pagamento.setDataVencimento(atualizado.getDataVencimento());
        pagamento.setDataPagamento(atualizado.getDataPagamento());
        pagamento.setMetodo(atualizado.getMetodo());
        pagamento.setValorPago(atualizado.getValorPago());

        return new PagamentoFornecedorDTO(repository.save(pagamento));
    }

    public void deletar(Integer id) {
        PagamentoFornecedor pagamento = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
        repository.delete(pagamento);
    }
}
