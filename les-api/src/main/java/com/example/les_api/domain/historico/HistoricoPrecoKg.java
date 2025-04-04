package com.example.les_api.domain.historico;

import java.util.Date;

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
@Table(name = "historico_preco_kg")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoricoPrecoKg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double precoKg;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataRegistro;
}
