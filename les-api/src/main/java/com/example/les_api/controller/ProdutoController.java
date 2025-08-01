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

import com.example.les_api.domain.produto.Produto;
import com.example.les_api.dto.ProdutoDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.ProdutoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/produto")
@AllArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @Operation(summary = "Listar todos os produtos", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Produto", acao = "ver")
    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listar() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @Operation(summary = "Buscar produto por ID", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Produto", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @Operation(summary = "Buscar produto por código de barras", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/cod/{codigoBarras}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable String codigoBarras) {
        return ResponseEntity.ok(produtoService.buscarPorCodigoBarras(codigoBarras));
    }

    @Operation(summary = "Relatório de produtos mais vendidos", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/relatorio")
    public ResponseEntity<List<ProdutoDTO>> relatorioMaisVendidos() {
        return ResponseEntity.ok(produtoService.produtosMaisVendidos());
    }

    @Operation(summary = "Adicionar novo produto", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Produto", acao = "adicionar")
    @PostMapping
    public ResponseEntity<ProdutoDTO> salvar(@RequestBody Produto produto) {
        return ResponseEntity.ok(produtoService.salvar(produto));
    }

    @Operation(summary = "Atualizar produto existente", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Produto", acao = "editar")
    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> atualizar(@PathVariable Integer id, @RequestBody Produto produto) {
        return ResponseEntity.ok(produtoService.atualizar(id, produto));
    }

    @Operation(summary = "Deletar produto", security = @SecurityRequirement(name = "bearerAuth"))
    @VerificaPermissao(tela = "Produto", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
