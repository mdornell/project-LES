package com.example.les_api.config;

import com.example.les_api.domain.permissao.Tela;
import com.example.les_api.repository.TelaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final TelaRepository telaRepository;

    @Override
    public void run(String... args) {
        List<String> telasDoSistema = List.of(
            "Dashboard",
            "Produto",
            "Cliente",
            "Venda",
            "Fornecedor",
            "Relatórios",
            "Recarga",
            "PagamentoFornecedor",
            "Acesso",
            "Funcionário"
        );

        for (String nome : telasDoSistema) {
            boolean jaExiste = telaRepository.findAll().stream()
                .anyMatch(t -> t.getNome().equalsIgnoreCase(nome));

            if (!jaExiste) {
                telaRepository.save(new Tela(null, nome));
            }
        }
    }
}