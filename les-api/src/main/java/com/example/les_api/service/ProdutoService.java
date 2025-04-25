package com.example.les_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.produto.Produto;
import com.example.les_api.dto.ProdutoDTO;
import com.example.les_api.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoDTO> listarTodos() {
        return produtoRepository.findAll().stream().map(ProdutoDTO::new).collect(Collectors.toList());
    }

    public ProdutoDTO buscarPorId(Integer id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return new ProdutoDTO(produto);
    }

    public ProdutoDTO buscarPorCodigoBarras(String codigoBarras) {
        Produto produto = produtoRepository.findByCodigoBarras(codigoBarras)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return new ProdutoDTO(produto);
    }

    public ProdutoDTO salvar(Produto produto) {
        return new ProdutoDTO(produtoRepository.save(produto));
    }

    public ProdutoDTO atualizar(Integer id, Produto atualizado) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(atualizado.getNome());
        produto.setCodigoBarras(atualizado.getCodigoBarras());
        produto.setDescricao(atualizado.getDescricao());
        produto.setPreco(atualizado.getPreco());
        produto.setQuantidade(atualizado.getQuantidade());
        produto.setAtivo(atualizado.getAtivo());

        return new ProdutoDTO(produtoRepository.save(produto));
    }

    public void deletar(Integer id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produtoRepository.delete(produto);
    }
}
