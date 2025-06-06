package com.example.les_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.service.AcessoService;


@RestController
@RequestMapping("/acesso")
public class AcessoController {

    @Autowired
    private AcessoService acessoService;

    @GetMapping("/{id}")
    public boolean entrar(@PathVariable String id) throws Exception {
        return acessoService.entradaSaida(id);
    }

}