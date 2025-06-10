package com.example.les_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.dto.PermissaoDTO;
import com.example.les_api.service.PermissaoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/permissao")
@RequiredArgsConstructor
public class PermissaoController {

    private final PermissaoService permissaoService;

    @Operation(summary = "Listar permissões de um funcionário", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/funcionario/{id}")
    public ResponseEntity<List<PermissaoDTO>> listar(@PathVariable Integer id) {
        return ResponseEntity.ok(permissaoService.listarPorFuncionario(id));
    }

    @Operation(summary = "Salvar permissões para um funcionário", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/funcionario/{id}")
    public ResponseEntity<Void> salvar(@PathVariable Integer id, @RequestBody List<PermissaoDTO> permissoes) {
        permissaoService.salvarPermissoes(id, permissoes);
        return ResponseEntity.ok().build();
    }
}
