package com.example.les_api.repository;

import com.example.les_api.domain.venda.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
}
