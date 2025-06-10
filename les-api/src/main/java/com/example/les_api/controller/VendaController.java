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
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.VendaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/venda")
@AllArgsConstructor
public class VendaController {

    private final VendaService vendaService;

    @Operation(summary = "Listar todas as vendas", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Venda", acao = "ver")
    @GetMapping
    public ResponseEntity<List<VendaDTO>> listarTodos() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @Operation(summary = "Buscar venda por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Venda", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<VendaDTO> buscarPorId(@PathVariable Integer id) {
        Venda venda = vendaService.buscarPorId(id);
        VendaDTO vendaDTO = new VendaDTO(venda);
        return ResponseEntity.ok(vendaDTO);
    }

    @Operation(summary = "Salvar uma nova venda", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Venda", acao = "adicionar")
    @PostMapping
    public ResponseEntity<Venda> salvar(@RequestBody VendaDTO vendaDTO) {
        return ResponseEntity.ok(vendaService.salvar(vendaDTO));
    }

    @Operation(summary = "Deletar uma venda por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Venda", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
