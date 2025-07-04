package com.example.les_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DREPeriodoDTO {
    private Double saldoAnterior;
    private List<DREDiarioDTO> relatorio;
}
