package com.example.les_api.domain.historico;

import com.example.les_api.domain.produto.Produto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "historico_preco_kg")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoricoPrecoKg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Double precoKg;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataRegistro;
}
