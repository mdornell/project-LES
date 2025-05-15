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

import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.VendaDTO;
import com.example.les_api.service.VendaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/venda")
@AllArgsConstructor
public class VendaController {

    private final VendaService vendaService;

    @PostMapping
    public ResponseEntity<Venda> salvar(@RequestBody VendaDTO vendaDTO) {
        System.out.println("VendaController.salvar: " + vendaDTO);
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
