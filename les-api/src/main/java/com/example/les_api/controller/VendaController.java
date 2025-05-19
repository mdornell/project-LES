package com.example.les_api.controller;

import java.util.List;
import java.util.stream.Collectors;

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
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.VendaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/venda")
@AllArgsConstructor
public class VendaController {

    private final VendaService vendaService;

    @VerificaPermissao(tela = "Venda", acao = "ver")
    @GetMapping
    public ResponseEntity<List<VendaDTO>> listarTodos() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @VerificaPermissao(tela = "Venda", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<VendaDTO> buscarPorId(@PathVariable Integer id) {
        Venda venda = vendaService.buscarPorId(id);
        VendaDTO vendaDTO = new VendaDTO(venda);
        return ResponseEntity.ok(vendaDTO);
    }

    @VerificaPermissao(tela = "Venda", acao = "adicionar")
    @PostMapping
    public ResponseEntity<VendaDTO> salvar(@RequestBody VendaDTO vendaDTO) {
        Venda venda = vendaService.salvar(vendaDTO);
        VendaDTO savedVendaDTO = new VendaDTO(venda);
        return ResponseEntity.ok(savedVendaDTO);
    }

    @VerificaPermissao(tela = "Venda", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
