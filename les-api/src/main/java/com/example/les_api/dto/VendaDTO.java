package com.example.les_api.dto;

import java.util.Date;
import java.util.List;

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
}
