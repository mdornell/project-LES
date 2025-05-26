package com.example.les_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.example.les_api.dto.HistoricoPrecoKgDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.HistoricoPrecoKgService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/refeicao") // ou altere para /preco-kg se preferir mais coerência
@RequiredArgsConstructor
public class HistoricoPrecoKgController {

    private final HistoricoPrecoKgService service;

    @VerificaPermissao(tela = "PrecoKg", acao = "ver")
    @GetMapping
    public ResponseEntity<List<HistoricoPrecoKgDTO>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @VerificaPermissao(tela = "PrecoKg", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<HistoricoPrecoKgDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @VerificaPermissao(tela = "PrecoKg", acao = "adicionar")
    @PostMapping
    public ResponseEntity<HistoricoPrecoKgDTO> salvar(@RequestBody HistoricoPrecoKg preco) {
        return ResponseEntity.ok(service.salvar(preco));
    }

    @VerificaPermissao(tela = "PrecoKg", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
