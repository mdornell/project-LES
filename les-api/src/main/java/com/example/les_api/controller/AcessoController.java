package com.example.les_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.service.AcessoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/acesso")
public class AcessoController {

    @Autowired
    private AcessoService acessoService;

    @Operation(summary = "Realiza a entrada ou saída de um usuário pelo ID", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/{id}")
    public boolean entrar(@PathVariable String id) throws Exception {
        return acessoService.entradaSaida(id);
    }

}