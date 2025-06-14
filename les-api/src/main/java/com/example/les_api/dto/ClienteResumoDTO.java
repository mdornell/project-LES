package com.example.les_api.dto;

public class ClienteResumoDTO {

    private String nome;
    private Double valorVendido;
    private Double saldo;
    private java.util.Date ultimaCompra;

    public ClienteResumoDTO(String nome, Double valorVendido, Double saldo, java.util.Date ultimaCompra) {
        this.nome = nome;
        this.valorVendido = valorVendido;
        this.saldo = saldo;
        this.ultimaCompra = ultimaCompra;
    }

    public String getNome() {
        return nome;
    }

    public Double getValorVendido() {
        return valorVendido;
    }

    public Double getSaldo() {
        return saldo;
    }

    public java.util.Date getUltimaCompra() {
        return ultimaCompra;
    }
}
