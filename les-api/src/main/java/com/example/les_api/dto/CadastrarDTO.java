package com.example.les_api.dto;

import com.example.les_api.domain.UsuarioRole;

public record CadastrarDTO(String login, String senha, UsuarioRole role) {
} 
