package com.example.les_api.domain.cliente;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nomeCliente;
    private String email;
    private Double saldo;
    private String codRFID;
    private Boolean ativo;

    @Temporal(TemporalType.DATE)
    private Date dataAniversario;
}
