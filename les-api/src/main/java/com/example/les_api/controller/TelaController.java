package com.example.les_api.controller;

import com.example.les_api.dto.TelaDTO;
import com.example.les_api.service.TelaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/telas")
@RequiredArgsConstructor
public class TelaController {

    private final TelaService telaService;

    @GetMapping
    public ResponseEntity<List<TelaDTO>> listar() {
        return ResponseEntity.ok(telaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TelaDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(telaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<TelaDTO> salvar(@RequestBody TelaDTO dto) {
        return ResponseEntity.ok(telaService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TelaDTO> atualizar(@PathVariable Integer id, @RequestBody TelaDTO dto) {
        return ResponseEntity.ok(telaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        telaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
