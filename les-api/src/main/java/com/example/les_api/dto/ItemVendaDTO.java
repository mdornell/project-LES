package com.example.les_api.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemVendaDTO {
    private Integer produtoId;
    private Integer quantidade;
    private Double custo;
}
