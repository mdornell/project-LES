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

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/pagamentos")
@AllArgsConstructor
public class PagamentoFornecedorController {

    private final PagamentoFornecedorService service;

    @GetMapping
    public ResponseEntity<List<PagamentoFornecedorDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoFornecedorDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping("/{fornecedorId}")
    public ResponseEntity<PagamentoFornecedorDTO> salvar(@PathVariable Integer fornecedorId,
            @RequestBody PagamentoFornecedor pagamento) {
        return ResponseEntity.ok(service.salvar(pagamento, fornecedorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagamentoFornecedorDTO> atualizar(@PathVariable Integer id,
            @RequestBody PagamentoFornecedor pagamento) {
        return ResponseEntity.ok(service.atualizar(id, pagamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
