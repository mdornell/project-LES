package com.example.les_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.dto.BarcodeDTO;
import com.example.les_api.service.BarcodePrintService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/barcode")
public class BarcodeController {

    @Autowired
    private BarcodePrintService printService;

    @Operation(summary = "Imprimir código de barras", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/print")
    public void imprimir(@RequestBody BarcodeDTO dto) {
        printService.imprimirComandoZPL(dto.getQuantidade(), dto.getCodigo());
    }
}
