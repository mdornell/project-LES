package com.example.les_api.controller;

import com.example.les_api.domain.fornecedor.Fornecedor;
import com.example.les_api.dto.FornecedorDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.FornecedorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedor")
@AllArgsConstructor
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @VerificaPermissao(tela = "Fornecedor", acao = "ver")
    @GetMapping
    public ResponseEntity<List<FornecedorDTO>> listarTodos() {
        return ResponseEntity.ok(fornecedorService.listarTodos());
    }

    @VerificaPermissao(tela = "Fornecedor", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<FornecedorDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(fornecedorService.buscarPorId(id));
    }

    @VerificaPermissao(tela = "Fornecedor", acao = "adicionar")
    @PostMapping
    public ResponseEntity<FornecedorDTO> salvar(@RequestBody Fornecedor fornecedor) {
        return ResponseEntity.ok(fornecedorService.salvar(fornecedor));
    }

    @VerificaPermissao(tela = "Fornecedor", acao = "editar")
    @PutMapping("/{id}")
    public ResponseEntity<FornecedorDTO> atualizar(@PathVariable Integer id, @RequestBody Fornecedor fornecedor) {
        return ResponseEntity.ok(fornecedorService.atualizar(id, fornecedor));
    }

    @VerificaPermissao(tela = "Fornecedor", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        fornecedorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

