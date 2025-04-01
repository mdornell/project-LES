package com.example.les_api.dto;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoricoPrecoKgDTO {

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

