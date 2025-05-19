package com.example.les_api.dto;

import java.util.Date;
import java.util.List;

import com.example.les_api.domain.venda.Venda;

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
    private Double valorTotal; // << NOVO CAMPO AQUI
    private ClienteDTO cliente;
    private List<ItemVendaDTO> itens;

    public VendaDTO(Venda venda) {
        this.id = venda.getId();
        this.dataHora = venda.getDataHora();
        this.descricaoVenda = venda.getDescricaoVenda();
        this.valorTotal = venda.getValorTotal();
        this.cliente = new ClienteDTO(venda.getCliente());
        this.itens = venda.getItens().stream().map(ItemVendaDTO::new).toList();
    }
}
