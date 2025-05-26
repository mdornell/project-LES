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
    private Double valorCusto;
    private Double valorVenda;

    // Construtor que converte ItemVenda em ItemVendaDTO
    public ItemVendaDTO(ItemVenda item) {
        this.produtoId = item.getProdutoId() != null ? item.getProdutoId().getId() : null;
        this.quantidade = item.getQuantidade();
        this.valorCusto = item.getValorCusto();
        this.valorVenda = item.getValorVenda();
    }
}