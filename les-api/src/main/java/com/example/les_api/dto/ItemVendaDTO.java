package com.example.les_api.dto;

import com.example.les_api.domain.venda.ItemVenda;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemVendaDTO {
    private Integer produtoId;
    private Integer quantidade;
    private Double custo;

    // Construtor que converte ItemVenda em ItemVendaDTO
    public ItemVendaDTO(ItemVenda item) {
        this.produtoId = item.getProdutoId() != null ? item.getProdutoId().getId() : null;
        this.quantidade = item.getQuantidade();
        this.custo = item.getCusto();
    }
}