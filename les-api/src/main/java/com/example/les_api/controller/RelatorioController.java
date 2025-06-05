package com.example.les_api.controller;

import com.example.les_api.dto.DREDiarioDTO;
import com.example.les_api.service.RelatorioService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping("/dre")
    public List<DREDiarioDTO> getDREPorPeriodo(
            @RequestParam("inicio") String inicio,
            @RequestParam("fim") String fim) {

        LocalDate dataInicio = LocalDate.parse(inicio);
        LocalDate dataFim = LocalDate.parse(fim);

        return relatorioService.gerarDREPorPeriodo(dataInicio, dataFim);
    }
}
