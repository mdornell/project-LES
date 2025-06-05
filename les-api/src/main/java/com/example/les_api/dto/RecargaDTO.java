package com.example.les_api.dto;

import lombok.Data;

@Data
public class RecargaDTO {
    private Double valor;
    private Integer clienteId;
    private String data; // formato: "2025-04-30 10:00:00"
}
