package com.example.les_api.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.dto.LoginRequestDTO;
import com.example.les_api.dto.RegisterRequestDTO;
import com.example.les_api.dto.ResponseDTO;
import com.example.les_api.repository.FuncionarioRepository;
import com.example.les_api.service.TokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        Funcionario funcionario = this.funcionarioRepository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(body.senha(), funcionario.getSenha())) {
            String token = this.tokenService.generateToken(funcionario);
            return ResponseEntity.ok(new ResponseDTO(funcionario.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<Funcionario> funcionario = this.funcionarioRepository.findByEmail(body.email());

        if (funcionario.isEmpty()) {
            Funcionario novofuncionario = new Funcionario();
            novofuncionario.setSenha(passwordEncoder.encode(body.senha()));
            novofuncionario.setEmail(body.email());
            novofuncionario.setNome(body.nome());
            this.funcionarioRepository.save(novofuncionario);

            String token = this.tokenService.generateToken(novofuncionario);
            return ResponseEntity.ok(new ResponseDTO(novofuncionario.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    // @PostMapping("/cadastroFuncionario")
    // public ResponseEntity cadastrarFuncionario(@RequestBody Funcionario funcionario) {
    //     Optional<Funcionario> funcionarioExistente = this.funcionarioRepository.findByEmail(funcionario.getEmail());

    //     if (funcionarioExistente.isEmpty()) {
    //         funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));
    //         this.funcionarioRepository.save(funcionario);
    //         return ResponseEntity.ok().build();
    //     }
    //     return ResponseEntity.badRequest().build();
    // }
}
