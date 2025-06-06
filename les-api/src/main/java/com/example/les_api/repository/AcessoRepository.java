package com.example.les_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;

import java.util.List;


public interface AcessoRepository extends JpaRepository<Acesso, Long> {
    List<Acesso> findByCliente(Cliente cliente);

    //dado o id do cliente retorne o ultimo acesso dele
    Acesso findTopByClienteOrderByDataAcessoDescHrEntradaDesc(Cliente cliente);
}
