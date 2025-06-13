package com.example.les_api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.ConsumoClienteDTO;
import com.example.les_api.dto.TicketMedioDTO;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
        @Query("SELECT DATE(v.dataHora), COUNT(DISTINCT v.cliente.id) FROM Venda v GROUP BY DATE(v.dataHora)")
        List<Object[]> clientesPorDia();

        // @Query("SELECT DATE(v.dataHora), SUM(iv.custo), SUM(iv.preco) FROM Venda v
        // JOIN v.itens iv GROUP BY DATE(v.dataHora)")
        // List<Object[]> dreDiario();
        @Query("SELECT new com.example.les_api.dto.ConsumoClienteDTO(c.nome, SUM(v.valorTotal)) " +
                        "FROM Venda v JOIN v.cliente c " +
                        "WHERE DATE(v.dataHora) BETWEEN :inicio AND :fim " +
                        "GROUP BY c.nome ORDER BY SUM(v.valorTotal) DESC")
        List<ConsumoClienteDTO> buscarConsumoClientes(LocalDate inicio, LocalDate fim);

        @Query("SELECT new com.example.les_api.dto.TicketMedioDTO(c.nome, ROUND(SUM(v.valorTotal) * 1.0 / COUNT(v), 2)) "
                        +
                        "FROM Venda v JOIN v.cliente c " +
                        "WHERE DATE(v.dataHora) BETWEEN :inicio AND :fim " +
                        "GROUP BY c.nome ORDER BY SUM(v.valorTotal)/COUNT(v) DESC")
        List<TicketMedioDTO> buscarTicketMedioClientes(LocalDate inicio, LocalDate fim);

}
