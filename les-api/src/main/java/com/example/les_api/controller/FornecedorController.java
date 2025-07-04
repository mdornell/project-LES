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

import com.example.les_api.domain.fornecedor.Fornecedor;
import com.example.les_api.dto.FornecedorDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.FornecedorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/fornecedor")
@AllArgsConstructor
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @Operation(summary = "Listar todos os fornecedores", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Fornecedor", acao = "ver")
    @GetMapping
    public ResponseEntity<List<FornecedorDTO>> listarTodos() {
        return ResponseEntity.ok(fornecedorService.listarTodos());
    }

    @Operation(summary = "Buscar fornecedor por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Fornecedor", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<FornecedorDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(fornecedorService.buscarPorId(id));
    }

    @Operation(summary = "Adicionar novo fornecedor", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Fornecedor", acao = "adicionar")
    @PostMapping
    public ResponseEntity<FornecedorDTO> salvar(@RequestBody Fornecedor fornecedor) {
        return ResponseEntity.ok(fornecedorService.salvar(fornecedor));
    }

    @Operation(summary = "Atualizar fornecedor existente", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Fornecedor", acao = "editar")
    @PutMapping("/{id}")
    public ResponseEntity<FornecedorDTO> atualizar(@PathVariable Integer id, @RequestBody Fornecedor fornecedor) {
        return ResponseEntity.ok(fornecedorService.atualizar(id, fornecedor));
    }

    @Operation(summary = "Deletar fornecedor por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Fornecedor", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        fornecedorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
