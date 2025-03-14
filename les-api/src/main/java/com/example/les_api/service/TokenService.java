package com.example.les_api.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.les_api.domain.usuario.Usuario;

@Service
public class TokenService {
    
    @Value("${api.security.token.secret}")
    private String secret;

    public String geracaoToken(Usuario usuario) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);
            return JWT.create()
                .withIssuer("auth-api")
                .withSubject(usuario.getUsername())
                .withExpiresAt(tempoExpiracao())
                .sign(algoritmo);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token", exception);
        }
    }

    public String validarToken(String token) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                .withIssuer("auth-api")
                .build()
                .verify(token)
                .getSubject();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }

    private Instant tempoExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}