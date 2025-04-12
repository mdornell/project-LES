package com.example.les_api.domain.fornecedor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fornecedor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String cnpj;
    private String telefone;
    private String email;
    private String endereco;
}
