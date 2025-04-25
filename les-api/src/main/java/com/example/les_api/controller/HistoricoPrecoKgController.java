package com.example.les_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.example.les_api.dto.HistoricoPrecoKgDTO;
import com.example.les_api.service.HistoricoPrecoKgService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/refeicao")
@AllArgsConstructor
public class HistoricoPrecoKgController {

    private final HistoricoPrecoKgService service;

    @GetMapping
    public ResponseEntity<List<HistoricoPrecoKgDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoricoPrecoKgDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<HistoricoPrecoKgDTO> salvar(@RequestBody HistoricoPrecoKg precoKg) {
        return ResponseEntity.ok(service.salvar(precoKg));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
