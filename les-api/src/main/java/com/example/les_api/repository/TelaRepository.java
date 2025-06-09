package com.example.les_api.repository;

import com.example.les_api.domain.permissao.Tela;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelaRepository extends JpaRepository<Tela, Integer> {
}
