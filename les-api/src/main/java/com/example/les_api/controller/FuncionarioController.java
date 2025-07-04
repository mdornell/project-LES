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

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.dto.FuncionarioDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.FuncionarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/funcionario")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @Operation(summary = "Listar todos os funcionários", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "funcionario", acao = "ver")
    @GetMapping
    public ResponseEntity<List<FuncionarioDTO>> listarTodos() {
        return ResponseEntity.ok(funcionarioService.listarTodos());
    }

    @Operation(summary = "Buscar funcionário por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "funcionario", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(funcionarioService.buscarPorId(id));
    }

    @Operation(summary = "Adicionar novo funcionário", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "funcionario", acao = "adicionar")
    @PostMapping
    public ResponseEntity<FuncionarioDTO> salvar(@RequestBody Funcionario funcionario) {
        return ResponseEntity.ok(funcionarioService.salvar(funcionario));
    }

    @Operation(summary = "Atualizar funcionário existente", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "funcionario", acao = "editar")
    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> atualizar(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        return ResponseEntity.ok(funcionarioService.atualizar(id, funcionario));
    }

    @Operation(summary = "Excluir funcionário", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "funcionario", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        funcionarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
