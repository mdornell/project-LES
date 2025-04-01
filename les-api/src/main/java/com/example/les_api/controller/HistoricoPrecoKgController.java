package com.example.les_api.controller;

import com.example.les_api.dto.HistoricoPrecoKgDTO;
import com.example.les_api.service.HistoricoPrecoKgService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historico-preco")
@AllArgsConstructor
public class HistoricoPrecoKgController {

    private final HistoricoPrecoKgService service;

    @GetMapping
    public ResponseEntity<List<HistoricoPrecoKgDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<HistoricoPrecoKgDTO>> listarPorProduto(@PathVariable Integer produtoId) {
        return ResponseEntity.ok(service.listarPorProduto(produtoId));
    }

    @PostMapping("/{produtoId}")
    public ResponseEntity<HistoricoPrecoKgDTO> salvar(@PathVariable Integer produtoId, @RequestParam Double precoKg) {
        return ResponseEntity.ok(service.salvar(produtoId, precoKg));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
