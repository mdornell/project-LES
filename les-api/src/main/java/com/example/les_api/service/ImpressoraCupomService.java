package com.example.les_api.service;


import java.nio.charset.StandardCharsets;
import java.util.*;

import javax.print.*;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.example.les_api.domain.venda.ItemVenda;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.HistoricoPrecoKgRepository;



@Service
public class ImpressoraCupomService {

    @Autowired
    private HistoricoPrecoKgRepository historicoPrecoKgRepository;

    @Autowired
    private ClienteRepository clienteRepository;


    public void imprimirAux(Acesso acesso) throws Exception {

        Optional<Cliente> clienteOpt = clienteRepository.findByCodigoRFID(acesso.getCliente().getCodigoRFID());

        if (clienteOpt.isPresent()) {
            imprimir(acesso);
        } 
    }

    public void imprimir(Acesso acesso) {
        if(acesso.getVendas().isEmpty()) {
            System.out.println("Nenhuma venda registrada para o acesso.");
            return;
        }

        try {
            String nomeImpressora = "EPSON TM-T20X Receipt6";
            PrintService[] services = PrintServiceLookup.lookupPrintServices(null, null);
            PrintService impressoraSelecionada = null;

            for (PrintService ps : services) {
                if (ps.getName().equalsIgnoreCase(nomeImpressora)) {
                    impressoraSelecionada = ps;
                    break;
                }
            }

            if (impressoraSelecionada == null) {
                System.out.println("Impressora não encontrada!");
                return;
            }

            String texto = formatarCupomFiscal(acesso.getVendas(), acesso);
            String conteudo = texto + "\n\n\n\n";
            byte[] bytes = conteudo.getBytes(StandardCharsets.ISO_8859_1);

            DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
            Doc doc = new SimpleDoc(bytes, flavor, null);
            DocPrintJob job = impressoraSelecionada.createPrintJob();
            PrintRequestAttributeSet aset = new HashPrintRequestAttributeSet();

            job.print(doc, aset);
            System.out.println("Cupom enviado para impressão.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String formatarCupomFiscal(List<Venda> vendas, Acesso acesso) {
        // Comando de corte de papel (GS V 1) e comando de fonte pequena
        final String COMANDO_CORTE = "\u001DVA";
        final String COMANDO_FONTE_PEQUENA = "\u001B!\u0000"; // Fonte menor (compressão)k

        StringBuilder cupom = new StringBuilder();
        cupom.append(COMANDO_FONTE_PEQUENA); // Aplica o comando de fonte reduzida

        final int LARGURA_CUPOM = 48;
        String linhaTracejada = String.join("", Collections.nCopies(LARGURA_CUPOM, "-")) + "\n";

        // Cabeçalho
        String nomeRefeitorio = "REFEITORIO DO IGOR";
        cupom.append(centralizarTexto(nomeRefeitorio, LARGURA_CUPOM)).append("\n");
        cupom.append(linhaTracejada);
        cupom.append("CUPOM FISCAL\n\n");

        // Dados do cliente
        String nomeCliente = vendas.isEmpty() ? "Desconhecido" : vendas.get(0).getCliente().getNome();
        cupom.append("Cliente: ").append(nomeCliente).append("\n");
        cupom.append("Entrada: ").append(acesso.getHrEntrada()).append("\n");
        cupom.append("Saida  : ").append(acesso.getHrSaida()).append("\n");
        cupom.append(linhaTracejada);

        // Título dos itens
        cupom.append(String.format("%-20s %4s %4s %8s %8s%n", "ITEM", "QNTD", "UN", "UNIT", "TOTAL"));
        cupom.append(linhaTracejada);

        double totalGeral = 0.0;
        int totalItens = 0;
        double pesoTotal = 0.0;

        Map<String, ItemConsolidado> itensConsolidados = new LinkedHashMap<>();

        for (Venda venda : vendas) {
            pesoTotal += venda.getPeso();
            for (ItemVenda item : venda.getItens()) {
                String nome = item.getProdutoId().getNome();
                if (!itensConsolidados.containsKey(nome)) {
                    itensConsolidados.put(nome,
                            new ItemConsolidado(nome, item.getValorVenda(), item.getQuantidade()));
                } else {
                    ItemConsolidado existente = itensConsolidados.get(nome);
                    existente.quantidade += item.getQuantidade();
                }
            }
        }

        if (pesoTotal > 0) {
             
            HistoricoPrecoKg historicoPrecoKgAux = historicoPrecoKgRepository.findFirstByOrderByIdDesc();
            double valorUnitario = historicoPrecoKgAux.getPrecoKg();
            double subtotal = pesoTotal * valorUnitario;
            cupom.append(String.format("%-20s %4.2f %4s %8.2f %8.2f%n",
                    "Refeicao", pesoTotal, "kg", valorUnitario, subtotal));
            totalGeral += subtotal;
            totalItens++;
        }

        for (ItemConsolidado ic : itensConsolidados.values()) {
            double subtotal = ic.quantidade * ic.precoUnitario;
            cupom.append(String.format("%-20s %4d %4s %8.2f %8.2f%n",
                    ic.nome, ic.quantidade, "un", ic.precoUnitario, subtotal));
            totalGeral += subtotal;
            totalItens += ic.quantidade;
        }

        cupom.append(linhaTracejada);
        cupom.append(String.format("%-36s %d%n", "TOTAL DE ITENS:", totalItens));
        cupom.append(String.format("%-36s R$ %8.2f%n%n", "TOTAL:", totalGeral));

        String agradecimento = "Obrigado pela preferencia!";
        cupom.append(centralizarTexto(agradecimento, LARGURA_CUPOM)).append("\n");

        String volteSempre = "Volte sempre!";
        cupom.append(centralizarTexto(volteSempre, LARGURA_CUPOM)).append("\n");

        // Duas linhas em branco e comando de corte
        cupom.append("\n\n").append(COMANDO_CORTE);

        return cupom.toString();
    }

    // Classe auxiliar interna para consolidar produtos
    private static class ItemConsolidado {
        String nome;
        double precoUnitario;
        int quantidade;

        public ItemConsolidado(String nome, double precoUnitario, int quantidade) {
            this.nome = nome;
            this.precoUnitario = precoUnitario;
            this.quantidade = quantidade;
        }
    }

    private String centralizarTexto(String texto, int largura) {
        int espacos = (largura - texto.length()) / 2;
        if (espacos <= 0)
            return texto;
        return " ".repeat(espacos) + texto;
    }

}
