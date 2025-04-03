package com.example.les_api.domain.produto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String descricao;
    private Double preco;
    private Integer quantidade;
    private Boolean ativo;
}
