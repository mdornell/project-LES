package com.example.les_api.domain.recarga;

import com.example.les_api.domain.cliente.Cliente;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "recarga")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recarga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double valor;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataRecarga;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
