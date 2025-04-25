package com.example.les_api.repository;

import com.example.les_api.domain.permissao.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PermissaoRepository extends JpaRepository<Permissao, Integer> {
    List<Permissao> findByFuncionarioId(Integer funcionarioId);
}
