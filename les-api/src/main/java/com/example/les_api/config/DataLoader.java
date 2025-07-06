package com.example.les_api.config;

import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.les_api.domain.permissao.Tela;
import com.example.les_api.repository.TelaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final TelaRepository telaRepository;

    @Override
    public void run(String... args) {
        // Mapeamento: Nome da Tela → URL correspondente
        Map<String, String> telasDoSistema = Map.ofEntries(
                Map.entry("Funcionário", "/funcionario"),
                Map.entry("Cliente", "/cliente"),
                Map.entry("Produto", "/produto"),
                Map.entry("Refeição", "/refeicao"),
                Map.entry("Fornecedor", "/fornecedor"),
                Map.entry("PagamentoFornecedor", "/pagamento-fornecedor"),
                Map.entry("Relatório de Venda", "/relatorio-venda"),
                Map.entry("Aniversariantes", "/aniversariantes"),
                Map.entry("DRE Diário", "/dre-diario"),
                Map.entry("Ticket Médio", "/ticket-medio"),
                Map.entry("Consumo Diário", "/consumo-diario"),
                Map.entry("Resumo Cliente", "/resumo-cliente"),
                Map.entry("Clientes Diários", "/clientes-diarios"),
                Map.entry("Relatório Produto", "/relatorio-produto"),
                Map.entry("Clientes em Aberto", "/clientes-em-aberto"),
                Map.entry("Venda", "/venda/:id"));

        for (Map.Entry<String, String> entrada : telasDoSistema.entrySet()) {
            String nome = entrada.getKey();
            String url = entrada.getValue();

            boolean jaExiste = telaRepository.findAll().stream()
                    .anyMatch(t -> t.getNome().equalsIgnoreCase(nome));

            if (!jaExiste) {
                telaRepository.save(new Tela(null, nome, url));
            }
        }
    }
}
