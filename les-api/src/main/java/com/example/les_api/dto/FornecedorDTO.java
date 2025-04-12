package com.example.les_api.dto;

import com.example.les_api.domain.fornecedor.Fornecedor;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FornecedorDTO {

    private Integer id;
    private String nome;
    private String cnpj;
    private String telefone;
    private String email;
    private String endereco;

    public FornecedorDTO(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nome = fornecedor.getNome();
        this.cnpj = fornecedor.getCnpj();
        this.telefone = fornecedor.getTelefone();
        this.email = fornecedor.getEmail();
        this.endereco = fornecedor.getEndereco();
    }
}

