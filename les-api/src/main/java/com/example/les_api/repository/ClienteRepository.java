package com.example.les_api.repository;

import com.example.les_api.domain.cliente.Cliente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    // @Query("SELECT c.nomeCliente, SUM(iv.custo) AS custoTotal " +
    //    "FROM Cliente c " +
    //    "JOIN Venda v ON c.id = v.cliente.id " +
    //    "JOIN ItemVenda iv ON v.id = iv.venda.id " +
    //    "GROUP BY c.nomeCliente")
    // List<Object[]> consumoClientes();
}
