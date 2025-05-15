package com.example.les_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.les_api.domain.produto.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    Optional<Produto> findByCodigoBarras(String codigoBarras); // Método para buscar produto por código de barras

    @Query("SELECT p FROM Produto p ORDER BY p.quantidade DESC")
    List<Produto> produtosMaisVendidos();
}
