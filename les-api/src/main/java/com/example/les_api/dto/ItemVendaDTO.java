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

    public ItemVendaDTO(ItemVenda itemVenda) {
        // Assuming ItemVenda has a getProdutoId() method
        this.produtoId = itemVenda.getProdutoId().getId();
        this.quantidade = itemVenda.getQuantidade();
        this.custo = itemVenda.getCusto();
    }
}
