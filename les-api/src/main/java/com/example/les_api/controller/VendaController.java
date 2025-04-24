package com.example.les_api.controller;

import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.VendaDTO;
import com.example.les_api.service.VendaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/venda")
@AllArgsConstructor
public class VendaController {

    private final VendaService vendaService;

    @PostMapping
    public ResponseEntity<Venda> salvar(@RequestBody VendaDTO vendaDTO) {
        return ResponseEntity.ok(vendaService.salvar(vendaDTO));
    }

    @GetMapping
    public ResponseEntity<List<Venda>> listarTodas() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(vendaService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
