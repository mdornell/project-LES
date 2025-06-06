package com.example.les_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;

import java.util.List;
import java.util.Optional;

public interface AcessoRepository extends JpaRepository<Acesso, Long> {

    List<Acesso> findByCliente(Cliente cliente);

    // Busca o último acesso de um cliente (entidade completa)
    Acesso findTopByClienteOrderByDataAcessoDescHrEntradaDesc(Cliente cliente);

    // Busca o último acesso sem saída registrada
    @Query("SELECT a FROM Acesso a WHERE a.cliente = :cliente AND a.hrSaida IS NULL ORDER BY a.dataAcesso DESC, a.hrEntrada DESC")
    Acesso findUltimoAcessoSemSaida(@Param("cliente") Cliente cliente);

    // ✅ Adicionado: busca o último acesso com base no ID do cliente (usado no VendaController)
    Optional<Acesso> findTopByClienteIdOrderByHrEntradaDesc(Integer clienteId);
}