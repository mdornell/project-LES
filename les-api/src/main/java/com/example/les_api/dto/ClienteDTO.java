package com.example.les_api.dto;

import java.util.Date;

import com.example.les_api.domain.cliente.Cliente;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {

    @JsonProperty("_id")
    private Integer id;
    private String nome;
    private String email;
    private Double saldo;
    private String codigoRFID;
    private Boolean ativo;
    private Date dataAniversario;

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.email = cliente.getEmail();
        this.saldo = cliente.getSaldo();
        this.codigoRFID = cliente.getCodigoRFID();
        this.ativo = cliente.isAtivo();
        this.dataAniversario = cliente.getDataAniversario();
    }
}
