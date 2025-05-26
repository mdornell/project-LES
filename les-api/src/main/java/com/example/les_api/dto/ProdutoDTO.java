package com.example.les_api.dto;

import com.example.les_api.domain.produto.Produto;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

    @JsonProperty("_id")
    private Integer id;

    private String nome;
    private String codigoBarras;
    private String descricao;
    private Double valorCusto;
    private Double valorVenda;
    private Integer quantidade;
    private Boolean ativo;

    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.codigoBarras = produto.getCodigoBarras();
        this.descricao = produto.getDescricao();
        this.valorCusto = produto.getValorCusto();
        this.valorVenda = produto.getValorVenda();
        this.quantidade = produto.getQuantidade();
        this.ativo = produto.getAtivo();
    }
}
