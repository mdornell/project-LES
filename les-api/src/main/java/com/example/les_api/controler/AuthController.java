package com.example.les_api.controler;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.domain.usuario.Usuario;
import com.example.les_api.dto.AutenticacaoDTO;
import com.example.les_api.dto.CadastrarDTO;
import com.example.les_api.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    AuthenticationManager authenticatorManager;
    
    @PostMapping("/login")
    public ResponseEntity login (@RequestBody @Valid AutenticacaoDTO data) {
        var nomeUsuario = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = this.authenticatorManager.authenticate(nomeUsuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity cadastrar (@RequestBody @Valid CadastrarDTO data) {
        if(this.repository.findByLogin() != null) return ResponseEntity.badRequest().build();
        
        String senhaCriptografada = new BCryptPasswordEncoder().encode(data.senha());
        Usuario usuario = new Usuario(data.login(), senhaCriptografada, data.role());

        this.repository.save(usuario);
        return ResponseEntity.ok().build();
    }
}