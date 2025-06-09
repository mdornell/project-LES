package com.example.les_api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.repository.FuncionarioRepository;

@SpringBootApplication
public class LesApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LesApiApplication.class, args);
    }

    // @Bean
    // public CommandLineRunner initAdmin(FuncionarioRepository
    // funcionarioRepository) {
    // return args -> {
    // // deleta todos os funcionarios
    // funcionarioRepository.deleteAll();

    // // cria um novo funcionario admin
    // Funcionario funcionario = new Funcionario();
    // funcionario.setNome("admin");
    // funcionario.setCargo("Admin");
    // funcionario.setEmail("admin@admin.com");
    // org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
    // passwordEncoder = new
    // org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    // funcionario.setSenha(passwordEncoder.encode("admin123"));
    // funcionarioRepository.save(funcionario);
    // };
    //}

}
