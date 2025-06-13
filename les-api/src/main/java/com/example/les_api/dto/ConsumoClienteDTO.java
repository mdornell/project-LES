package com.example.les_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConsumoClienteDTO {
    private String nomeCliente;
    private Double valorTotal;
}
