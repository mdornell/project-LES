package com.example.les_api.service;

import com.example.les_api.domain.permissao.Tela;
import com.example.les_api.dto.TelaDTO;
import com.example.les_api.repository.TelaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TelaService {

    private final TelaRepository telaRepository;

    public List<TelaDTO> listarTodas() {
        return telaRepository.findAll()
                .stream()
                .map(TelaDTO::new)
                .collect(Collectors.toList());
    }

    public TelaDTO buscarPorId(Integer id) {
        Tela tela = telaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tela não encontrada"));
        return new TelaDTO(tela);
    }

    public TelaDTO salvar(TelaDTO dto) {
        Tela nova = dto.toEntity();
        return new TelaDTO(telaRepository.save(nova));
    }

    public TelaDTO atualizar(Integer id, TelaDTO dto) {
        Tela tela = telaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tela não encontrada"));

        tela.setNome(dto.getNome());
        tela.setUrl(dto.getUrl());

        return new TelaDTO(telaRepository.save(tela));
    }

    public void deletar(Integer id) {
        telaRepository.deleteById(id);
    }
}
