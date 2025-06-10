package com.example.les_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.example.les_api.dto.PagamentoFornecedorDTO;
import com.example.les_api.service.PagamentoFornecedorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/pagamentos")
@AllArgsConstructor
public class PagamentoFornecedorController {

    private final PagamentoFornecedorService service;

    @Operation(summary = "Listar todos os pagamentos de fornecedores", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping
    public ResponseEntity<List<PagamentoFornecedorDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @Operation(summary = "Buscar pagamento de fornecedor por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/{id}")
    public ResponseEntity<PagamentoFornecedorDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @Operation(summary = "Salvar novo pagamento para fornecedor", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/{fornecedorId}")
    public ResponseEntity<PagamentoFornecedorDTO> salvar(@PathVariable Integer fornecedorId,
            @RequestBody PagamentoFornecedor pagamento) {
        return ResponseEntity.ok(service.salvar(pagamento, fornecedorId));
    }

    @Operation(summary = "Atualizar pagamento de fornecedor", security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/{id}")
    public ResponseEntity<PagamentoFornecedorDTO> atualizar(@PathVariable Integer id,
            @RequestBody PagamentoFornecedor pagamento) {
        return ResponseEntity.ok(service.atualizar(id, pagamento));
    }

    @Operation(summary = "Deletar pagamento de fornecedor", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
