package com.example.les_api.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RelatorioClientesPorDiaDTO {
    private Date data;
    private int quantidadeClientes;

    public RelatorioClientesPorDiaDTO(Date data, int quantidadeClientes) {
        this.data = data;
        this.quantidadeClientes = quantidadeClientes;
    }

    // Getters e Setters
}
