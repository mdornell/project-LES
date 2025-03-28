package com.example.les_api.dto;

import com.example.les_api.domain.cliente.Cliente;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {

    private Integer id;
    private String nomeCliente;
    private String email;
    private Double saldo;
    private String codRFID;
    private Boolean ativo;
    private Date dataAniversario;

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nomeCliente = cliente.getNomeCliente();
        this.email = cliente.getEmail();
        this.saldo = cliente.getSaldo();
        this.codRFID = cliente.getCodRFID();
        this.ativo = cliente.getAtivo();
        this.dataAniversario = cliente.getDataAniversario();
    }
}
