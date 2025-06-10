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
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.HistoricoPrecoKgService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/refeicao")
@RequiredArgsConstructor
public class HistoricoPrecoKgController {

    private final HistoricoPrecoKgService service;

    @Operation(summary = "Listar todos os históricos de preço por kg", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "PrecoKg", acao = "ver")
    @GetMapping
    public ResponseEntity<List<HistoricoPrecoKgDTO>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @Operation(summary = "Buscar histórico de preço por kg por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "PrecoKg", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<HistoricoPrecoKgDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @Operation(summary = "Adicionar novo histórico de preço por kg", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "PrecoKg", acao = "adicionar")
    @PostMapping
    public ResponseEntity<HistoricoPrecoKgDTO> salvar(@RequestBody HistoricoPrecoKg preco) {
        return ResponseEntity.ok(service.salvar(preco));
    }

    @Operation(summary = "Excluir histórico de preço por kg por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "PrecoKg", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
