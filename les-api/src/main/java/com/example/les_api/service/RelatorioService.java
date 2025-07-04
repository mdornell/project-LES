package com.example.les_api.service;

import com.example.les_api.domain.pagamento.PagamentoFornecedor;
import com.example.les_api.domain.recarga.Recarga;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.DREDiarioDTO;
import com.example.les_api.dto.DREPeriodoDTO;
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

    public DREPeriodoDTO gerarDREPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        // Cálculo do saldo anterior
        Date limite = java.sql.Date.valueOf(dataInicio);
        double totalRecargas = recargaRepository.totalRecargasAntes(limite);
        double totalPagamentos = pagamentoRepository.totalPagamentosAntes(dataInicio);
        double saldoAnterior = totalRecargas - totalPagamentos;

        // Recargas no período
        List<Recarga> recargas = recargaRepository.findAll();
        Map<LocalDate, Double> recargasPorDia = recargas.stream()
                .filter(r -> r.getDataRecarga() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getDataRecarga().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                        Collectors.summingDouble(Recarga::getValor)
                ));
        recargasPorDia.keySet().removeIf(d -> d.isBefore(dataInicio) || d.isAfter(dataFim));

        // Pagamentos efetivados ou vencendo no período
        List<PagamentoFornecedor> pagamentos = pagamentoRepository.findAll();
        Map<LocalDate, Double> pagamentosPorDia = pagamentos.stream()
                .filter(p -> {
                    LocalDate dataReferencia = p.getDataPagamento() != null
                            ? p.getDataPagamento()
                            : (p.getDataVencimento() != null ? p.getDataVencimento() : null);
                    return dataReferencia != null && !dataReferencia.isBefore(dataInicio) && !dataReferencia.isAfter(dataFim);
                })
                .collect(Collectors.groupingBy(
                        p -> p.getDataPagamento() != null ? p.getDataPagamento() : p.getDataVencimento(),
                        Collectors.summingDouble(PagamentoFornecedor::getValorPago)
                ));

        // Construção do relatório diário
        List<DREDiarioDTO> resultado = new ArrayList<>();
        double saldo = saldoAnterior;
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yy");

        for (LocalDate dia = dataInicio; !dia.isAfter(dataFim); dia = dia.plusDays(1)) {
            double receber = recargasPorDia.getOrDefault(dia, 0.0);
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

        return new DREPeriodoDTO(saldoAnterior, resultado);
    }
}
