package com.example.les_api.dto;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.example.les_api.domain.venda.Venda;
import com.example.les_api.domain.venda.ItemVenda;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendaDTO {
    private Integer id;
    private Date dataHora;
    private String descricaoVenda;
    private Double valorTotal;
    private ClienteDTO cliente;
    private List<ItemVendaDTO> itens;

    // Construtor que converte Venda em VendaDTO
    public VendaDTO(Venda venda) {
        this.id = venda.getId();
        this.dataHora = venda.getDataHora();
        this.descricaoVenda = venda.getDescricaoVenda();
        this.valorTotal = venda.getValorTotal();
        this.cliente = venda.getCliente() != null ? new ClienteDTO(venda.getCliente()) : null;
        this.itens = venda.getItens() != null
            ? venda.getItens().stream()
            .map(item -> new ItemVendaDTO(item))
            .collect(Collectors.toList())
            : null;
    }
}