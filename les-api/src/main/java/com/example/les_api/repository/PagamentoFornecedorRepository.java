package com.example.les_api.repository;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface PagamentoFornecedorRepository extends JpaRepository<PagamentoFornecedor, Integer> {

    @Query("SELECT COALESCE(SUM(p.valorPago), 0.0) FROM PagamentoFornecedor p WHERE p.dataPagamento < :limite")
    Double totalPagamentosAntes(@Param("limite") LocalDate limite);
}
