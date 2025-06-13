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
    @Query("SELECT new com.example.les_api.dto.ConsumoClienteDTO(v.cliente.nome, SUM(v.valorTotal)) " +
            "FROM Venda v WHERE DATE(v.dataHora) BETWEEN :inicio AND :fim " +
            "GROUP BY v.cliente.nome")
    List<ConsumoClienteDTO> consumoClientesPorPeriodo(
            @Param("inicio") java.time.LocalDate inicio,
            @Param("fim") java.time.LocalDate fim);

    @Query("SELECT new com.example.les_api.dto.TicketMedioDTO(v.cliente.nome, SUM(v.valorTotal) / COUNT(v)) " +
            "FROM Venda v " +
            "WHERE DATE(v.dataHora) BETWEEN :inicio AND :fim " +
            "GROUP BY v.cliente.nome")
    List<TicketMedioDTO> ticketMedioPorCliente(@Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

}
