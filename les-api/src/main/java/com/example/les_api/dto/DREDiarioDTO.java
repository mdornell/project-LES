package com.example.les_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DREDiarioDTO {
    private String data;
    private Double receber;
    private Double pagar;
    private Double resultado;
    private Double saldo;
}
