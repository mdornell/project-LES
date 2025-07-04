package com.example.les_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TicketMedioDTO {
    private String nomeCliente;
    private Double ticketMedio;
}