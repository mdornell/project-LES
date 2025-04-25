package com.example.les_api.domain.permissao;

import com.example.les_api.domain.funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "permissao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Boolean podeVer;
    private Boolean podeAdicionar;
    private Boolean podeEditar;
    private Boolean podeExcluir;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "tela_id", nullable = false)
    private Tela tela;
}
