package com.example.les_api.repository;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.les_api.domain.cliente.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findByCodigoRFID(String codigoRFID);

    List<Cliente> findByAtivoTrue();

    @Query("SELECT c FROM Cliente c WHERE FUNCTION('DAY', c.dataAniversario) = FUNCTION('DAY', CURRENT_DATE) AND FUNCTION('MONTH', c.dataAniversario) = FUNCTION('MONTH', CURRENT_DATE)")
    List<Cliente> aniversariantesHoje();

    @Query("SELECT c FROM Cliente c WHERE c.saldo < 0 AND c.dataVencimentoCartao <= :limite")
    List<Cliente> buscarClientesComSaldoAberto(@Param("limite") Date limite);
}
