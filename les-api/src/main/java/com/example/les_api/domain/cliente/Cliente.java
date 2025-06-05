package com.example.les_api.domain.cliente;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String email;
    private Double saldo;
    private String codigoRFID;
    private Boolean ativo;

    @Temporal(TemporalType.DATE)
    @Column(name = "dataVencimentoCartao")
    private Date dataVencimentoCartao;

    @Temporal(TemporalType.DATE)
    private Date dataAniversario;
}
