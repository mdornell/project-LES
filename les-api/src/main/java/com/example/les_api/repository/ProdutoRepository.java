package com.example.les_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.les_api.domain.produto.Produto;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}
