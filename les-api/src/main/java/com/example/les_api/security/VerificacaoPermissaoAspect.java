// src/main/java/com/example/les_api/security/VerificacaoPermissaoAspect.java
package com.example.les_api.security;

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.service.PermissaoService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Method;

@Aspect
@Component
@RequiredArgsConstructor
public class VerificacaoPermissaoAspect {

    private final PermissaoService permissaoService;

    @Before("@annotation(com.example.les_api.security.VerificaPermissao)")
    public void verificarPermissao(JoinPoint joinPoint) {
        Funcionario funcionario = (Funcionario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        VerificaPermissao anotacao = method.getAnnotation(VerificaPermissao.class);

        String tela = anotacao.tela();
        String acao = anotacao.acao();

        boolean permitido = permissaoService.temPermissao(funcionario, tela, acao);
        if (!permitido) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Acesso negado: sem permissão para " + acao + " na tela " + tela);
        }
    }
}
