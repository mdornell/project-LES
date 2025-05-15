package com.example.les_api.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DREDiarioDTO {
    private Date data;
    private Double receita;
    private Double despesa;
    private Double lucro;

    public Double getLucro() {
        return lucro = receita - despesa;
    }
}
