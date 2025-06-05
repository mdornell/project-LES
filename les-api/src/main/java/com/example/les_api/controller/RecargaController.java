package com.example.les_api.controller;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.recarga.Recarga;
import com.example.les_api.dto.RecargaDTO;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.RecargaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/recargas")
public class RecargaController {

    private final RecargaRepository recargaRepository;
    private final ClienteRepository clienteRepository;

    public RecargaController(RecargaRepository recargaRepository, ClienteRepository clienteRepository) {
        this.recargaRepository = recargaRepository;
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public ResponseEntity<?> registrarRecarga(@RequestBody RecargaDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Recarga recarga = new Recarga();
        recarga.setValor(dto.getValor());
        recarga.setCliente(cliente);
        recarga.setDataRecarga(Timestamp.valueOf(dto.getData())); // Formato: yyyy-MM-dd HH:mm:ss

        recargaRepository.save(recarga);
        return ResponseEntity.ok("Recarga registrada com sucesso.");
    }
}
