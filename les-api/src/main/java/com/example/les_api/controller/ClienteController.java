package com.example.les_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.dto.ClienteDTO;
import com.example.les_api.dto.ClienteEmAbertoDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.ClienteService;
//import com.example.les_api.service.SaldoClienteService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cliente")
@AllArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @VerificaPermissao(tela = "Cliente", acao = "ver")
    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @VerificaPermissao(tela = "Cliente", acao = "ver")
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(clienteService.buscarPorId(id));
    }

    @VerificaPermissao(tela = "Cliente", acao = "ver")
    @GetMapping("/rfid/{rfid}")
    public ResponseEntity<ClienteDTO> buscarPorRFID(@PathVariable String rfid) {
        return ResponseEntity.ok(clienteService.buscarPorRFID(rfid));
    }

    @VerificaPermissao(tela = "Cliente", acao = "adicionar")
    @PostMapping
    public ResponseEntity<ClienteDTO> salvar(@RequestBody Cliente cliente) {
        System.out.println(
                String.format(
                        "{\n\"nome\":\"%s\",\n\"email\":\"%s\",\n\"saldo\":%s,\n\"codigoRFID\":\"%s\",\n\"ativo\":%s,\n\"dataAniversario\":\"%s\"\n}",
                        cliente.getNome(),
                        cliente.getEmail(),
                        cliente.getSaldo(),
                        cliente.getCodigoRFID(),
                        cliente.getAtivo(),
                        cliente.getDataAniversario()));
        return ResponseEntity.ok(clienteService.salvar(cliente));
    }

    @VerificaPermissao(tela = "Cliente", acao = "editar")
    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.atualizar(id, cliente));
    }

    @VerificaPermissao(tela = "Cliente", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/em-aberto")
    public ResponseEntity<List<ClienteEmAbertoDTO>> listarEmAberto(
            @RequestParam(required = false) Integer dias) {
        return ResponseEntity.ok(clienteService.listarClientesEmAberto(Optional.ofNullable(dias)));
    }

    @GetMapping("/ativos")
    public List<Cliente> listarClientesAtivos() {
        return clienteService.listarClientesAtivos();
    }

    @GetMapping("/inadimplentes")
    public List<Cliente> listarClientesInadimplentes() {
        return clienteService.listarClientesComSaldoAbertoMaisDe30Dias();
    }
}
