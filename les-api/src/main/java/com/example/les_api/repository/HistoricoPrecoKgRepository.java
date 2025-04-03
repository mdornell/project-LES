package com.example.les_api.repository;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoPrecoKgRepository extends JpaRepository<HistoricoPrecoKg, Integer> {
    List<HistoricoPrecoKg> findByProdutoId(Integer produtoId);
}
