package com.example.les_api.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.recarga.Recarga;
import com.example.les_api.dto.RecargaDTO;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.RecargaRepository;

@Service
public class RecargaService {

    private final RecargaRepository recargaRepository;
    private final ClienteRepository clienteRepository;

    public RecargaService(RecargaRepository recargaRepository, ClienteRepository clienteRepository) {
        this.recargaRepository = recargaRepository;
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public void registrarRecarga(RecargaDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Atualiza o saldo do cliente
        System.out.println("Atualizando saldo do cliente: " + cliente.getId());
        cliente.setSaldo(cliente.getSaldo() + dto.getValor());
        clienteRepository.save(cliente);

        // Registra a recarga
        Recarga recarga = new Recarga();
        recarga.setCliente(cliente);
        recarga.setValor(dto.getValor());
        recarga.setDataRecarga(new Date());

        recargaRepository.save(recarga);
    }

}
