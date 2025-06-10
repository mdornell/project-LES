package com.example.les_api.controller;

import com.example.les_api.dto.RecargaDTO;
import com.example.les_api.service.RecargaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/recargas")
public class RecargaController {

    private final RecargaService recargaService;

    public RecargaController(RecargaService recargaService) {
        this.recargaService = recargaService;
    }

    @Operation(summary = "Registrar uma nova recarga", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<?> registrarRecarga(@RequestBody RecargaDTO dto) {
        recargaService.registrarRecarga(dto);
        return ResponseEntity.ok("Recarga registrada com sucesso.");
    }
}
