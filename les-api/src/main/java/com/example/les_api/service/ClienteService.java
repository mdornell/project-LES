package com.example.les_api.service;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.dto.ClienteDTO;
import com.example.les_api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll().stream().map(ClienteDTO::new).collect(Collectors.toList());
    }

    public ClienteDTO buscarPorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return new ClienteDTO(cliente);
    }

    public ClienteDTO salvar(Cliente cliente) {
        return new ClienteDTO(clienteRepository.save(cliente));
    }

    public ClienteDTO atualizar(Integer id, Cliente atualizado) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNomeCliente(atualizado.getNomeCliente());
        cliente.setEmail(atualizado.getEmail());
        cliente.setSaldo(atualizado.getSaldo());
        cliente.setCodRFID(atualizado.getCodRFID());
        cliente.setAtivo(atualizado.getAtivo());
        cliente.setDataAniversario(atualizado.getDataAniversario());

        return new ClienteDTO(clienteRepository.save(cliente));
    }

    public void deletar(Integer id) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        clienteRepository.delete(cliente);
    }

    // public List<ClienteDTO> consumoCliente(Integer id) {
    //     Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    //     return clienteRepository.consumoClientes().stream()
    //             .map(ClienteDTO::new)
    //             .collect(Collectors.toList());
    // }
}
