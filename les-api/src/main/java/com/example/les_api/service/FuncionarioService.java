package com.example.les_api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.dto.FuncionarioDTO;
import com.example.les_api.repository.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<FuncionarioDTO> listarTodos() {
        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        return funcionarios.stream().map(FuncionarioDTO::new).collect(Collectors.toList());
    }

    public FuncionarioDTO buscarPorId(Integer id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        return new FuncionarioDTO(funcionario);
    }

    public FuncionarioDTO salvar(Funcionario funcionario) {
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha())); // Criptografando a senha
        return new FuncionarioDTO(funcionarioRepository.save(funcionario));
    }

    public FuncionarioDTO atualizar(Integer id, Funcionario funcionarioAtualizado) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        funcionario.setNome(funcionarioAtualizado.getNome());
        funcionario.setCargo(funcionarioAtualizado.getCargo());
        funcionario.setEmail(funcionarioAtualizado.getEmail());

        if (!funcionarioAtualizado.getSenha().isEmpty()) {
            funcionario.setSenha(passwordEncoder.encode(funcionarioAtualizado.getSenha()));
        }

        return new FuncionarioDTO(funcionarioRepository.save(funcionario));
    }

    public void deletar(Integer id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        funcionarioRepository.delete(funcionario);
    }
}
