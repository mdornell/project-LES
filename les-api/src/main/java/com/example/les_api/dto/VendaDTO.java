package com.example.les_api.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendaDTO {
    private Integer clienteId;
    private String descricaoVenda;
    private List<ItemVendaDTO> itens;
}
