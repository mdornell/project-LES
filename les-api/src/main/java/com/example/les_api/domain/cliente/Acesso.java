package com.example.les_api.domain.cliente;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.les_api.domain.venda.Venda;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
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

//    @ManyToOne
//    @JoinColumn(name = "venda_id")
//    private Venda venda;

    // lista de vendas
    @OneToMany(mappedBy = "acesso", cascade = CascadeType.ALL)
    private List<Venda> vendas = new ArrayList<>();

}

