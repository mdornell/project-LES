package com.example.les_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClienteEmAbertoDTO {
    private Integer id;
    private String nome;
    private Double valor;
    private long dias;
}
