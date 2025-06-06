package com.example.les_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.les_api.domain.historico.HistoricoPrecoKg;

@Repository
public interface HistoricoPrecoKgRepository extends JpaRepository<HistoricoPrecoKg, Integer> {
    HistoricoPrecoKg findFirstByOrderByIdDesc();
}
