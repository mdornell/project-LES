package com.example.les_api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.dto.DREDiarioDTO;
import com.example.les_api.dto.DREPeriodoDTO;
import com.example.les_api.service.RelatorioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @Operation(summary = "Gerar DRE por período", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/dre")
    public DREPeriodoDTO getDREPorPeriodo(
            @RequestParam("inicio") String inicio,
            @RequestParam("fim") String fim) {

        LocalDate dataInicio = LocalDate.parse(inicio);
        LocalDate dataFim = LocalDate.parse(fim);

        return relatorioService.gerarDREPorPeriodo(dataInicio, dataFim);
    }
}
