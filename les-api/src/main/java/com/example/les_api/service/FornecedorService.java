package com.example.les_api.service;

import com.example.les_api.domain.fornecedor.Fornecedor;
import com.example.les_api.dto.FornecedorDTO;
import com.example.les_api.repository.FornecedorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FornecedorService {

    private final FornecedorRepository repository;

    public List<FornecedorDTO> listarTodos() {
        return repository.findAll().stream().map(FornecedorDTO::new).collect(Collectors.toList());
    }

    public FornecedorDTO buscarPorId(Integer id) {
        return new FornecedorDTO(repository.findById(id).orElseThrow(() -> new RuntimeException("Fornecedor não encontrado")));
    }

    public FornecedorDTO salvar(Fornecedor fornecedor) {
        return new FornecedorDTO(repository.save(fornecedor));
    }

    public FornecedorDTO atualizar(Integer id, Fornecedor atualizado) {
        Fornecedor fornecedor = repository.findById(id).orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        fornecedor.setNome(atualizado.getNome());
        fornecedor.setCnpj(atualizado.getCnpj());
        fornecedor.setTelefone(atualizado.getTelefone());
        fornecedor.setEmail(atualizado.getEmail());
        fornecedor.setEndereco(atualizado.getEndereco());

        return new FornecedorDTO(repository.save(fornecedor));
    }

    public void deletar(Integer id) {
        Fornecedor fornecedor = repository.findById(id).orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
        repository.delete(fornecedor);
    }
}
