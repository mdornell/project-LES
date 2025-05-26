package com.example.les_api.controller;

import java.util.List;

import com.example.les_api.security.VerificaPermissao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.dto.FuncionarioDTO;
import com.example.les_api.service.FuncionarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/funcionario")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @VerificaPermissao(tela = "funcionario", acao = "ver")
    @GetMapping
    public ResponseEntity<List<FuncionarioDTO>> listarTodos() {
        return ResponseEntity.ok(funcionarioService.listarTodos());
    }

    @VerificaPermissao(tela = "funcionario", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(funcionarioService.buscarPorId(id));
    }

    @VerificaPermissao(tela = "funcionario", acao = "adicionar")
    @PostMapping
    public ResponseEntity<FuncionarioDTO> salvar(@RequestBody Funcionario funcionario) {
        return ResponseEntity.ok(funcionarioService.salvar(funcionario));
    }

    @VerificaPermissao(tela = "funcionario", acao = "editar")
    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> atualizar(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        return ResponseEntity.ok(funcionarioService.atualizar(id, funcionario));
    }

    @VerificaPermissao(tela = "funcionario", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        funcionarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
