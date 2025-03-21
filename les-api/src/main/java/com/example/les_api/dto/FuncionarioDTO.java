package com.example.les_api.dto;

import com.example.les_api.domain.funcionario.Funcionario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FuncionarioDTO {
    private String id;
    private String nome;
    private String codigoRFID;
    private String cargo;
    private String email;
    private String senha;

    public FuncionarioDTO(Funcionario funcionario) {
        this.id = funcionario.getId();
        this.nome = funcionario.getNome();
        this.codigoRFID = funcionario.getCodigoRFID();
        this.cargo = funcionario.getCargo();
        this.email = funcionario.getEmail();
        this.senha = funcionario.getSenha();
    }
}