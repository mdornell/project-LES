package com.example.les_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.les_api.domain.venda.Venda;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
    @Query("SELECT DATE(v.dataHora), COUNT(DISTINCT v.cliente.id) FROM Venda v GROUP BY DATE(v.dataHora)")
    List<Object[]> clientesPorDia();

    @Query("SELECT v FROM Venda v WHERE v.cliente.id = :clienteId AND v.paga = false")
    List<Venda> buscarVendasNaoPagasPorCliente(@Param("clienteId") Integer clienteId);
}
