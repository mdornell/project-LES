package com.example.les_api.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissaoDTO {
    private Integer telaId;
    private String nomeTela;
    private Boolean podeVer;
    private Boolean podeAdicionar;
    private Boolean podeEditar;
    private Boolean podeExcluir;
}
