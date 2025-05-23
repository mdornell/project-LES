package com.example.les_api.repository;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoFornecedorRepository extends JpaRepository<PagamentoFornecedor, Integer> {
}
