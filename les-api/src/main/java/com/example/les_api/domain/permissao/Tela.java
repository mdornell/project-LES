package com.example.les_api.domain.permissao;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tela")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tela {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String nome;
}
