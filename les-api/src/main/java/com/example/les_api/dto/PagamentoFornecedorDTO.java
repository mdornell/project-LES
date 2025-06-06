package com.example.les_api.dto;

import java.time.LocalDate;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagamentoFornecedorDTO {

    @JsonProperty("_id")
    private Integer id;
    private String descricao;
    private LocalDate dataVencimento;
    private LocalDate dataPagamento;
    private String metodo;
    private Double valorPago;
    private Integer fornecedorId;

    public PagamentoFornecedorDTO(PagamentoFornecedor pagamento) {
        this.id = pagamento.getId();
        this.descricao = pagamento.getDescricao();
        this.dataVencimento = pagamento.getDataVencimento();
        this.dataPagamento = pagamento.getDataPagamento();
        this.metodo = pagamento.getMetodo();
        this.valorPago = pagamento.getValorPago();
        this.fornecedorId = pagamento.getFornecedor().getId();
    }
}
