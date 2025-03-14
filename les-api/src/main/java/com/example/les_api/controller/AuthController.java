package com.example.les_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.les_api.domain.usuario.Usuario;
import com.example.les_api.dto.AutenticacaoDTO;
import com.example.les_api.dto.CadastrarDTO;
import com.example.les_api.repository.UsuarioRepository;
import com.example.les_api.service.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /*
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;
    */

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AutenticacaoDTO data) {
        // Verifica se o usuário existe no banco de dados
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLogin(data.login());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // Verifica se a senha está correta
            if (new BCryptPasswordEncoder().matches(data.senha(), usuario.getPassword())) {
                return ResponseEntity.ok("Usuário autenticado com sucesso!");
            }
        }
        
        return ResponseEntity.status(401).body("Usuário ou senha inválidos!");

        /*
        // Código original com JWT e autenticação
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = authenticationManager.authenticate(usernamePassword);
        var usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.geracaoToken(usuario);
        return ResponseEntity.ok().body(token);
        */
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody CadastrarDTO data) {
        if (usuarioRepository.findByLogin(data.login()).isPresent()) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        String senhaCriptografada = new BCryptPasswordEncoder().encode(data.senha());
        Usuario usuario = new Usuario(data.login(), senhaCriptografada, data.role());
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().body("Usuário cadastrado com sucesso!");
    }
}
