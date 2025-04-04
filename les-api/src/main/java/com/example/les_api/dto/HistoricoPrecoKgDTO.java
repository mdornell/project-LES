package com.example.les_api.dto;

import java.util.Date;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoricoPrecoKgDTO {

    @JsonProperty("_id")
    private Integer id;

    private Integer produtoId;
    private Double precoKg;
    private Date dataRegistro;

    public HistoricoPrecoKgDTO(HistoricoPrecoKg historico) {
        this.id = historico.getId();
        this.produtoId = historico.getProduto().getId();
        this.precoKg = historico.getPrecoKg();
        this.dataRegistro = historico.getDataRegistro();
    }
}
