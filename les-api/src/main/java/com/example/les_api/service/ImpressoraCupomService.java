package com.example.les_api.service;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;
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
        if (acesso.getVendas().isEmpty()) {
            System.out.println("Nenhuma venda registrada para o acesso.");
            return;
        }

        try {
            String nomeImpressora = "EPSON TM-T20X Receipt";
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

            Venda ultimaVenda = acesso.getVendas().get(acesso.getVendas().size() - 1);
            Cliente cliente = ultimaVenda.getCliente();
            double saldoAtual = cliente.getSaldo();
            double valorVenda = ultimaVenda.getValorTotal();
            double saldoAnterior = saldoAtual + valorVenda;

            String texto = formatarCupomFiscal(ultimaVenda, acesso, saldoAnterior, saldoAtual);
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

    private String formatarCupomFiscal(Venda venda, Acesso acesso, double saldoAnterior, double saldoAtual) {
        final String COMANDO_CORTE = "\u001DVA";
        final String COMANDO_FONTE_PEQUENA = "\u001B!\u0000";

        StringBuilder cupom = new StringBuilder();
        cupom.append(COMANDO_FONTE_PEQUENA);

        final int LARGURA_CUPOM = 48;
        String linhaTracejada = "-".repeat(LARGURA_CUPOM) + "\n";

        cupom.append(centralizarTexto("REFEITORIO DO IGOR", LARGURA_CUPOM)).append("\n");
        cupom.append(linhaTracejada);
        cupom.append("CUPOM FISCAL\n\n");

        String nomeCliente = venda.getCliente() != null ? venda.getCliente().getNome() : "Desconhecido";
        cupom.append("Cliente: ").append(nomeCliente).append("\n");
        cupom.append("Entrada: ").append(acesso.getHrEntrada()).append("\n");
        cupom.append("Saida  : ").append(acesso.getHrSaida()).append("\n");
        cupom.append(linhaTracejada);

        cupom.append(String.format("%-20s %4s %4s %8s %8s%n", "ITEM", "QNTD", "UN", "UNIT", "TOTAL"));
        cupom.append(linhaTracejada);

        double totalGeral = 0.0;
        int totalItens = 0;

        // 1. Refeição
        double valorRefeicao = venda.getPeso();
        double precoKg = historicoPrecoKgRepository.findFirstByOrderByIdDesc().getPrecoKg();
        double pesoBruto = valorRefeicao / precoKg;

        if (valorRefeicao > 0) {
            cupom.append(String.format("%-20s %4.2f %4s %8.2f %8.2f%n",
                    "Refeicao", pesoBruto, "kg", precoKg, valorRefeicao));
            totalGeral += valorRefeicao;
            totalItens++;
        }

        // 2. Itens da venda
        for (ItemVenda item : venda.getItens()) {
            String nome = item.getProdutoId().getNome();
            int qtd = item.getQuantidade();
            double precoUnitario = item.getValorVenda();
            double subtotal = qtd * precoUnitario;

            cupom.append(String.format("%-20s %4d %4s %8.2f %8.2f%n",
                    nome, qtd, "un", precoUnitario, subtotal));
            totalGeral += subtotal;
            totalItens += qtd;
        }

        cupom.append(linhaTracejada);
        cupom.append(String.format("%-36s %d%n", "TOTAL DE ITENS:", totalItens));
        cupom.append(String.format("%-36s R$ %8.2f%n", "TOTAL:", totalGeral));
        cupom.append(linhaTracejada);
        cupom.append(String.format("%-36s R$ %8.2f%n", "Saldo anterior:", saldoAnterior));
        cupom.append(String.format("%-36s R$ %8.2f%n", "Saldo atual:", saldoAtual));
        cupom.append(linhaTracejada);
        cupom.append(centralizarTexto("Obrigado pela preferencia!", LARGURA_CUPOM)).append("\n");
        cupom.append(centralizarTexto("Volte sempre!", LARGURA_CUPOM)).append("\n");

        cupom.append("\n\n").append(COMANDO_CORTE);
        return cupom.toString();
    }

    private String centralizarTexto(String texto, int largura) {
        int espacos = (largura - texto.length()) / 2;
        return espacos <= 0 ? texto : " ".repeat(espacos) + texto;
    }

}
