package com.example.les_api.dto;

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
}
