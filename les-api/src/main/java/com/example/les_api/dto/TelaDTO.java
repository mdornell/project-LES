package com.example.les_api.dto;

import com.example.les_api.domain.permissao.Tela;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TelaDTO {
    private Integer id;
    private String nome;
    private String url;

    public TelaDTO(Tela tela) {
        this.id = tela.getId();
        this.nome = tela.getNome();
        this.url = tela.getUrl();
    }

    public Tela toEntity() {
        return new Tela(id, nome, url);
    }
}
