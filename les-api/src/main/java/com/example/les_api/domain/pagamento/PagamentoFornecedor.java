package com.example.les_api.domain.pagamento;

import com.example.les_api.domain.fornecedor.Fornecedor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "pagamento_fornecedor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagamentoFornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String descricao;

    private LocalDate dataVencimento;

    private LocalDate dataPagamento;

    private String metodo;

    private Double valorPago;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    @JsonIgnoreProperties("pagamentos") // evita loop infinito se quiser serializar
    private Fornecedor fornecedor;
}
