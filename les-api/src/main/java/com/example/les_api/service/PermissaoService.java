package com.example.les_api.service;

import com.example.les_api.domain.funcionario.Funcionario;
import com.example.les_api.domain.permissao.Permissao;
import com.example.les_api.domain.permissao.Tela;
import com.example.les_api.dto.PermissaoDTO;
import com.example.les_api.repository.FuncionarioRepository;
import com.example.les_api.repository.PermissaoRepository;
import com.example.les_api.repository.TelaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissaoService {

    private final PermissaoRepository permissaoRepository;
    private final TelaRepository telaRepository;
    private final FuncionarioRepository funcionarioRepository;

    public List<PermissaoDTO> listarPorFuncionario(Integer funcionarioId) {
        return permissaoRepository.findByFuncionarioId(funcionarioId).stream().map(p -> {
            PermissaoDTO dto = new PermissaoDTO();
            dto.setTelaId(p.getTela().getId());
            dto.setNomeTela(p.getTela().getNome());
            dto.setPodeVer(p.getPodeVer());
            dto.setPodeAdicionar(p.getPodeAdicionar());
            dto.setPodeEditar(p.getPodeEditar());
            dto.setPodeExcluir(p.getPodeExcluir());
            return dto;
        }).collect(Collectors.toList());
    }

    public void salvarPermissoes(Integer funcionarioId, List<PermissaoDTO> permissoes) {
        Funcionario funcionario = funcionarioRepository.findById(funcionarioId)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        permissaoRepository.findByFuncionarioId(funcionarioId).forEach(permissaoRepository::delete);

        List<Permissao> entidades = permissoes.stream().map(dto -> {
            Tela tela = telaRepository.findById(dto.getTelaId())
                    .orElseThrow(() -> new RuntimeException("Tela não encontrada"));
            Permissao p = new Permissao();
            p.setFuncionario(funcionario);
            p.setTela(tela);
            p.setPodeVer(dto.getPodeVer());
            p.setPodeAdicionar(dto.getPodeAdicionar());
            p.setPodeEditar(dto.getPodeEditar());
            p.setPodeExcluir(dto.getPodeExcluir());
            return p;
        }).collect(Collectors.toList());

        permissaoRepository.saveAll(entidades);
    }
}
