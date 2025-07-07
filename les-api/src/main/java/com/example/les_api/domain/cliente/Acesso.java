package com.example.les_api.domain.cliente;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.les_api.domain.venda.Venda;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Acesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataAcesso;

    private String hrEntrada;

    private String hrSaida;

    private Double valorConsumido;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @OneToMany(mappedBy = "acesso")
    private List<Venda> vendas = new ArrayList<>();
}
