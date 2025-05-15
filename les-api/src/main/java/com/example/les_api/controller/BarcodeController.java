package com.example.les_api.controller;

import com.example.les_api.dto.BarcodeDTO;
import com.example.les_api.service.BarcodePrintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/barcode")
public class BarcodeController {

    @Autowired
    private BarcodePrintService printService;

    @PostMapping("/print")
    public void imprimir(@RequestBody BarcodeDTO dto) {
        printService.imprimirComandoZPL(dto.getQuantidade(), dto.getCodigo());
    }
}
