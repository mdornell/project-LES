package com.example.les_api.domain.fornecedor;

import java.util.ArrayList;
import java.util.List;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fornecedor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String cnpj;
    private String telefone;
    private String email;
    private String endereco;

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // ou @JsonManagedReference
    private List<PagamentoFornecedor> pagamentos = new ArrayList<>();
}
