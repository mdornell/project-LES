package com.example.les_api.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.VendaDTO;
import com.example.les_api.security.VerificaPermissao;
import com.example.les_api.service.VendaService;
import com.example.les_api.service.AcessoService;
import com.example.les_api.repository.AcessoRepository;
import com.example.les_api.service.ImpressoraCupomService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/venda")
@AllArgsConstructor
public class VendaController {

    private final VendaService vendaService;
    private final AcessoService acessoService;
    private final AcessoRepository acessoRepository;
    private final ImpressoraCupomService impressoraCupomService;

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
    public ResponseEntity<Venda> salvar(@RequestBody VendaDTO vendaDTO) {
        return ResponseEntity.ok(vendaService.salvar(vendaDTO));
    }

    @VerificaPermissao(tela = "Venda", acao = "excluir")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @VerificaPermissao(tela = "Venda", acao = "adicionar")
    @PostMapping("/finalizar")
    public ResponseEntity<?> finalizarVenda(@RequestBody VendaDTO vendaDTO) throws Exception {
        Venda venda = vendaService.salvar(vendaDTO);
        
        Optional<Acesso> acessoOptional = acessoService.findUltimoAcessoPorCliente(venda.getCliente().getId());

        if (acessoOptional.isPresent()) {
            Acesso acesso = acessoOptional.get();

            // Define hora de saída formatada como String
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            String horaSaida = sdf.format(new Date());
            acesso.setHrSaida(horaSaida);

            // Garante a consistência bidirecional
            acesso.getVendas().add(venda);
            System.out.println(acesso.getVendas().getFirst().getId());
            acessoRepository.save(acesso);

            // Realiza a impressão com os dados da venda
            impressoraCupomService.imprimirAux(acesso);
        }

        return ResponseEntity.ok().body("Venda realizada com sucesso!");
    }
}
