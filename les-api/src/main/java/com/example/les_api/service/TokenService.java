package com.example.les_api.service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.les_api.domain.usuario.Usuario;

@Service
public class TokenService {
    
    @Value("${api.security.token.secret}")
    private String secret;
    public String geracaoToken(Usuario usuario) {
        try{

            Algorithm algoritimo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("auth-api")
                .withSubject(usuario.getUsername())
                .withExpiresAt(tempoExpiracao())
                .sign(algoritimo);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro de gereção do token", exception);
        }
    }

    public String validarToken(String token) {
        try{ 
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            return JWT.require(algoritimo)
                .withIssuer("auth-api")
                .build()
                .verify(token)
                .getSubject();
        } catch (Exception exception) {
            return  "";
        }
    }

    private Instant tempoExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("03:00"));
    }
}
