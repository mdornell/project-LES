package com.example.les_api.controller;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.example.les_api.dto.PagamentoFornecedorDTO;
import com.example.les_api.service.PagamentoFornecedorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagamentos")
@AllArgsConstructor
public class PagamentoFornecedorController {

    private final PagamentoFornecedorService service;

    @GetMapping
    public ResponseEntity<List<PagamentoFornecedorDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoFornecedorDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<PagamentoFornecedorDTO> salvar(@RequestBody PagamentoFornecedor pagamento,
                                                         @RequestParam Integer fornecedorId) {
        return ResponseEntity.ok(service.salvar(pagamento, fornecedorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagamentoFornecedorDTO> atualizar(@PathVariable Integer id, @RequestBody PagamentoFornecedor pagamento) {
        return ResponseEntity.ok(service.atualizar(id, pagamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
