package com.example.les_api.service;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.example.les_api.domain.recarga.Recarga;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.DREDiarioDTO;
import com.example.les_api.repository.PagamentoFornecedorRepository;
import com.example.les_api.repository.RecargaRepository;
import com.example.les_api.repository.VendaRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    private final VendaRepository vendaRepository;
    private final PagamentoFornecedorRepository pagamentoRepository;
    private final RecargaRepository recargaRepository;

    public RelatorioService(VendaRepository vendaRepository,
                            PagamentoFornecedorRepository pagamentoRepository,
                            RecargaRepository recargaRepository) {
        this.vendaRepository = vendaRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.recargaRepository = recargaRepository;
    }

    public List<DREDiarioDTO> gerarDREPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        // Cálculo automático do saldo anterior
        Date limite = java.sql.Date.valueOf(dataInicio);
        double totalRecargas = recargaRepository.totalRecargasAntes(limite);
        double totalPagamentos = pagamentoRepository.totalPagamentosAntes(dataInicio);
        double saldoAnterior = totalRecargas - totalPagamentos;

        // Agrupamento de recebimentos (vendas)
        List<Venda> vendas = vendaRepository.findAll();
        Map<LocalDate, Double> recebimentosPorDia = vendas.stream()
                .filter(v -> v.getDataHora() != null)
                .collect(Collectors.groupingBy(
                        v -> v.getDataHora().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                        Collectors.summingDouble(Venda::getValorTotal)
                ));
        recebimentosPorDia.keySet().removeIf(d -> d.isBefore(dataInicio) || d.isAfter(dataFim));

        // Agrupamento de pagamentos
        List<PagamentoFornecedor> pagamentos = pagamentoRepository.findAll();
        Map<LocalDate, Double> pagamentosPorDia = pagamentos.stream()
                .filter(p -> p.getDataPagamento() != null)
                .collect(Collectors.groupingBy(
                        PagamentoFornecedor::getDataPagamento,
                        Collectors.summingDouble(PagamentoFornecedor::getValorPago)
                ));
        pagamentosPorDia.keySet().removeIf(d -> d.isBefore(dataInicio) || d.isAfter(dataFim));

        // Construção do relatório
        List<DREDiarioDTO> resultado = new ArrayList<>();
        double saldo = saldoAnterior;
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yy");

        for (LocalDate dia = dataInicio; !dia.isAfter(dataFim); dia = dia.plusDays(1)) {
            double receber = recebimentosPorDia.getOrDefault(dia, 0.0);
            double pagar = pagamentosPorDia.getOrDefault(dia, 0.0);
            double resultadoDia = receber - pagar;
            saldo += resultadoDia;

            resultado.add(new DREDiarioDTO(
                    sdf.format(java.sql.Date.valueOf(dia)),
                    receber,
                    pagar,
                    resultadoDia,
                    saldo
            ));
        }

        return resultado;
    }
}
