package com.example.les_api.security;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface VerificaPermissao {
    String tela();
    String acao(); // valores: ver, adicionar, editar, excluir
}
