package com.example.les_api.controller;

import com.example.les_api.dto.PermissaoDTO;
import com.example.les_api.service.PermissaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissao")
@RequiredArgsConstructor
public class PermissaoController {

    private final PermissaoService permissaoService;

    @GetMapping("/funcionario/{id}")
    public ResponseEntity<List<PermissaoDTO>> listar(@PathVariable Integer id) {
        return ResponseEntity.ok(permissaoService.listarPorFuncionario(id));
    }

    @PostMapping("/funcionario/{id}")
    public ResponseEntity<Void> salvar(@PathVariable Integer id, @RequestBody List<PermissaoDTO> permissoes) {
        permissaoService.salvarPermissoes(id, permissoes);
        return ResponseEntity.ok().build();
    }
}
