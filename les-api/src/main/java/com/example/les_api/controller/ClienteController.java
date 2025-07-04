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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cliente")
@AllArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @VerificaPermissao(tela = "Cliente", acao = "ver")
    @GetMapping
    @Operation(summary = "Listar todos os clientes", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ClienteDTO>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @VerificaPermissao(tela = "Cliente", acao = "ver")
    @GetMapping("/{id}")
    @Operation(summary = "Buscar cliente por ID", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ClienteDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(clienteService.buscarPorId(id));
    }

    @VerificaPermissao(tela = "Cliente", acao = "ver")
    @GetMapping("/rfid/{rfid}")
    @Operation(summary = "Buscar cliente por RFID", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ClienteDTO> buscarPorRFID(@PathVariable String rfid) {
        return ResponseEntity.ok(clienteService.buscarPorRFID(rfid));
    }

    @VerificaPermissao(tela = "Cliente", acao = "adicionar")
    @PostMapping
    @Operation(summary = "Salvar novo cliente", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ClienteDTO> salvar(@RequestBody Cliente cliente) {
        System.out.println(
                String.format(
                        "{\n\"nome\":\"%s\",\n\"email\":\"%s\",\n\"saldo\":%s,\n\"codigoRFID\":\"%s\",\n\"ativo\":%s,\n\"dataAniversario\":\"%s\"\n}",
                        cliente.getNome(),
                        cliente.getEmail(),
                        cliente.getSaldo(),
                        cliente.getCodigoRFID(),
                        cliente.isAtivo(),
                        cliente.getDataAniversario()));
        return ResponseEntity.ok(clienteService.salvar(cliente));
    }

    @VerificaPermissao(tela = "Cliente", acao = "editar")
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar cliente", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ClienteDTO> atualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.atualizar(id, cliente));
    }

    @VerificaPermissao(tela = "Cliente", acao = "excluir")
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar cliente", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/em-aberto")
    @Operation(summary = "Listar clientes em aberto", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ClienteEmAbertoDTO>> listarEmAberto(
            @RequestParam(required = false) Integer dias) {
        return ResponseEntity.ok(clienteService.listarClientesEmAberto(Optional.ofNullable(dias)));
    }

    @GetMapping("/ativos")
    @Operation(summary = "Listar clientes ativos", security = @SecurityRequirement(name = "bearerAuth"))
    public List<Cliente> listarClientesAtivos() {
        return clienteService.listarClientesAtivos();
    }

    @GetMapping("/inadimplentes")
    @Operation(summary = "Listar clientes inadimplentes", security = @SecurityRequirement(name = "bearerAuth"))
    public List<Cliente> listarClientesInadimplentes() {
        return clienteService.listarClientesComSaldoAbertoMaisDe30Dias();
    }

    @PostMapping("/{id}/quitar-dividas")
    public ResponseEntity<String> quitarDividas(@PathVariable Integer id) {
        clienteService.quitarDividasDoCliente(id);
        return ResponseEntity.ok("Dívidas quitadas com sucesso.");
    }

    @GetMapping("/{id}/valor-dividas")
    @Operation(summary = "Obter valor total das dívidas em aberto do cliente", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Double> valorDividasAPagar(@PathVariable Integer id) {
        double total = clienteService.valorDividasAPagar(id);
        return ResponseEntity.ok(total);
    }
}
