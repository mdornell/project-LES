package com.example.les_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.les_api.domain.venda.Venda;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
    @Query("SELECT DATE(v.dataHora), COUNT(DISTINCT v.cliente.id) FROM Venda v GROUP BY DATE(v.dataHora)")
    List<Object[]> clientesPorDia();

    // @Query("SELECT DATE(v.dataHora), SUM(iv.custo), SUM(iv.preco) FROM Venda v
    // JOIN v.itens iv GROUP BY DATE(v.dataHora)")
    // List<Object[]> dreDiario();

}
