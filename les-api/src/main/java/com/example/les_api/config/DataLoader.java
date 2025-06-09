package com.example.les_api.config;

import com.example.les_api.domain.permissao.Tela;
import com.example.les_api.repository.TelaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final TelaRepository telaRepository;

    @Override
    public void run(String... args) {
        // Mapeamento: Nome da Tela → URL correspondente
        Map<String, String> telasDoSistema = Map.of(
            "Dashboard", "/dashboard",
            "Produto", "/produto",
            "Cliente", "/cliente",
            "Venda", "/venda",
            "Fornecedor", "/fornecedor",
            "Relatórios", "/relatorios",
            "Recarga", "/recarga",
            "PagamentoFornecedor", "/pagamento-fornecedor",
            "Acesso", "/acesso",
            "Funcionário", "/funcionario"
        );

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
