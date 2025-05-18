package com.example.les_api.service;

import java.util.Date;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.ClienteDTO;
import com.example.les_api.dto.ClienteEmAbertoDTO;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.VendaRepository;
@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VendaRepository vendaRepository;

    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll().stream().map(ClienteDTO::new).collect(Collectors.toList());
    }

    public ClienteDTO buscarPorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return new ClienteDTO(cliente);
    }

    public ClienteDTO buscarPorRFID(String rfid) {
        Cliente cliente = clienteRepository.findByCodigoRFID(rfid)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return new ClienteDTO(cliente);
    }

    public ClienteDTO salvar(Cliente cliente) {

        System.out.println(
                "ClienteService.salvar: " + cliente.getNome() + ", " + cliente.getEmail() + ", " + cliente.getSaldo()
                        + ", " + cliente.getCodigoRFID() + ", " + cliente.getAtivo() + ", "
                        + cliente.getDataAniversario());

        return new ClienteDTO(clienteRepository.save(cliente));
    }

    public ClienteDTO atualizar(Integer id, Cliente atualizado) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(atualizado.getNome());
        cliente.setEmail(atualizado.getEmail());
        cliente.setSaldo(atualizado.getSaldo());
        cliente.setCodigoRFID(atualizado.getCodigoRFID());
        cliente.setAtivo(atualizado.getAtivo());
        cliente.setDataAniversario(atualizado.getDataAniversario());

        return new ClienteDTO(clienteRepository.save(cliente));
    }

    public void deletar(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        clienteRepository.delete(cliente);
    }

    // public List<ClienteDTO> consumoCliente(Integer id) {
    // Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new
    // RuntimeException("Cliente não encontrado"));
    // return clienteRepository.consumoClientes().stream()
    // .map(ClienteDTO::new)
    // .collect(Collectors.toList());
    // }

    public List<ClienteDTO> buscarAniversariantes() {
        return clienteRepository.aniversariantesHoje().stream()
            .map(ClienteDTO::new)
            .collect(Collectors.toList());
    }

    public List<ClienteEmAbertoDTO> listarClientesEmAberto(Optional<Integer> diasMinimos) {
    List<Venda> vendas = vendaRepository.findAll();
    Date hoje = new Date();

    return vendas.stream()
        .filter(v -> v.getValorTotal() != null && v.getCliente() != null)
        .map(v -> {
            long dias = ChronoUnit.DAYS.between(
                v.getDataHora().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                hoje.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
            );
            return new ClienteEmAbertoDTO(
                v.getCliente().getNome(),
                v.getValorTotal(),
                dias
            );
        })
        .filter(c -> diasMinimos.isEmpty() || c.getDias() >= diasMinimos.get())
        .collect(Collectors.toList());
}
}
