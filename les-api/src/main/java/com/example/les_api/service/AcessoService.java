package com.example.les_api.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.dto.ClienteEmAbertoDTO;
import com.example.les_api.repository.AcessoRepository;
import com.example.les_api.repository.ClienteRepository;

@Service
public class AcessoService {

    @Autowired
    private AcessoRepository acessoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ImpressoraCupomService impressoraCupomService;

    @Autowired
    private ClienteService clienteService;

    public boolean verificarBloqueado(Cliente cli) {
        List<ClienteEmAbertoDTO> todos = clienteService.listarClientesEmAberto(Optional.of(30));
        List<Cliente> clientesEmAberto = todos.stream()
                .map(dto -> clienteRepository.findById(dto.getId()).orElse(null))
                .filter(c -> c != null)
                .toList();

        for (Cliente clienteAux : clientesEmAberto) {
            if (cli.getId().equals(clienteAux.getId())) {
                LocalDate dataVencimento = LocalDate.now().plusDays(29);
                java.util.Date dataVencimentoDate = java.util.Date
                        .from(dataVencimento.atStartOfDay(java.time.ZoneId.systemDefault()).toInstant());
                clienteAux.setDataVencCartao(dataVencimentoDate);
                clienteRepository.save(clienteAux);
                return false;
            }
        }

        List<ClienteEmAbertoDTO> todosMaisDe30Dias = clienteService.listarClientesEmAberto(Optional.of(30));
        List<Cliente> bloqueados = todosMaisDe30Dias.stream()
                .map(dto -> clienteRepository.findById(dto.getId()).orElse(null))
                .filter(c -> c != null)
                .toList();

        for (Cliente clienteAux : bloqueados) {
            if (cli.getId().equals(clienteAux.getId())) {
                return true;
            }
        }
        return false;
    }

    public boolean entradaSaida(String codRFID) throws Exception {
        boolean retorno = false;
        Optional<Cliente> cliente = clienteRepository.findByCodigoRFID(codRFID);

        if (cliente.isPresent()) {
            if (!cliente.get().isAtivo()) {
                entrar(cliente.get());
                retorno = true;
            } else {
                sair(cliente.get());
                retorno = false;
            }
        }
        return retorno;
    }

    public Acesso entrar(Cliente cliente) {
        if (!verificarBloqueado(cliente)) {
            cliente.setAtivo(true);
            clienteRepository.save(cliente);

            Acesso novoAcesso = new Acesso();
            novoAcesso.setCliente(cliente);
            novoAcesso.setDataAcesso(LocalDate.now());
            novoAcesso.setHrEntrada(getHorarioEmString());
            return acessoRepository.save(novoAcesso);
        }
        return null;
    }

    public Acesso sair(Cliente cliente) throws Exception {
        Acesso acesso = acessoRepository.findTopByClienteOrderByDataAcessoDescHrEntradaDesc(cliente);

        if (acesso != null) {
            cliente.setAtivo(false);
            clienteRepository.save(cliente);
            acesso.setHrSaida(getHorarioEmString());
            impressoraCupomService.imprimirAux(acesso);
        }

        return acessoRepository.save(acesso);
    }

    private String getHorarioEmString() {
        LocalTime horaAtual = LocalTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        return horaAtual.format(formatter);
    }

    public Acesso encontrarUltimoAcesso(Cliente cli) {
        return acessoRepository.findTopByClienteOrderByDataAcessoDescHrEntradaDesc(cli);
    }

    // ✅ Novo método adicionado para o VendaController
    public Optional<Acesso> findUltimoAcessoPorCliente(Integer clienteId) {
        return acessoRepository.findTopByClienteIdOrderByHrEntradaDesc(clienteId);
    }
}