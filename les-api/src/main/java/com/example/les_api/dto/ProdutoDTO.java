package com.example.les_api.dto;

import com.example.les_api.domain.produto.Produto;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

    private Integer id;
    private String nome;
    private String descricao;
    private Double preco;
    private Integer quantidade;
    private Boolean ativo;

    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.descricao = produto.getDescricao();
        this.preco = produto.getPreco();
        this.quantidade = produto.getQuantidade();
        this.ativo = produto.getAtivo();
    }
}
