package com.example.les_api.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.historico.HistoricoPrecoKg;
import com.example.les_api.domain.produto.Produto;
import com.example.les_api.domain.venda.ItemVenda;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.ConsumoClienteDTO;
import com.example.les_api.dto.RelatorioClientesPorDiaDTO;
import com.example.les_api.dto.TicketMedioDTO;
import com.example.les_api.dto.VendaDTO;
import com.example.les_api.repository.AcessoRepository;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.HistoricoPrecoKgRepository;
import com.example.les_api.repository.ProdutoRepository;
import com.example.les_api.repository.VendaRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;
    private final AcessoRepository acessoRepository;
    private final HistoricoPrecoKgRepository historicoPrecoKgRepository;
    

    @Transactional
    public Venda salvar(VendaDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getCliente_id())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setDescricaoVenda(dto.getDescricaoVenda());
        venda.setDataHora(new Date());

        List<ItemVenda> itens = dto.getItens().stream().map(itemDto -> {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            int novaQuantidade = produto.getQuantidade() - itemDto.getQuantidade();
            if (novaQuantidade < 0) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }

            produto.setQuantidade(novaQuantidade);
            produtoRepository.save(produto);

            ItemVenda item = new ItemVenda();
            item.setProdutoId(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setValorCusto(itemDto.getValorCusto() != null ? itemDto.getValorCusto() : 0.0);
            item.setValorVenda(produto.getValorVenda());
            item.setVenda(venda);
            return item;
        }).collect(Collectors.toList());

        venda.setItens(itens);

        // ✅ 1. Calcular valor dos itens
        Double valorItens = itens.stream()
                .mapToDouble(item -> item.getProdutoId().getValorVenda() * item.getQuantidade())
                .sum();
        venda.setValorTotal(valorItens); // Apenas valor dos produtos

        // ✅ 2. Calcular valor da refeição (peso × preço por kg)
        HistoricoPrecoKg historico = Optional.ofNullable(historicoPrecoKgRepository.findFirstByOrderByIdDesc())
                .orElseThrow(() -> new RuntimeException("Nenhum valor de preço por kg encontrado no histórico"));

        Double precoKg = historico.getPrecoKg();
        Double pesoBruto = dto.getPeso();
        Double valorRefeicao = pesoBruto * precoKg;

        venda.setPeso(valorRefeicao); // Aqui salva o valor monetário do peso

        // ✅ 3. Atualizar saldo do cliente
        Double valorTotalPago = valorItens + valorRefeicao;
        cliente.setSaldo(cliente.getSaldo() - valorTotalPago);
        clienteRepository.save(cliente);

        // ✅ 4. Associar o último acesso
        Optional<Acesso> ultimoAcessoSemSaida = Optional.ofNullable(
                acessoRepository.findUltimoAcessoSemSaida(cliente));

        venda.setAcesso(ultimoAcessoSemSaida
                .orElseThrow(() -> new RuntimeException("Último acesso sem saída não encontrado para o cliente")));

        return vendaRepository.save(venda);
    }

    public List<VendaDTO> listarTodas() {
        return vendaRepository.findAll()
                .stream()
                .map(VendaDTO::new)
                .collect(Collectors.toList());
    }

    public Venda buscarPorId(Integer id) {
        return vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
    }

    public void deletar(Integer id) {
        vendaRepository.deleteById(id);
    }

    public List<RelatorioClientesPorDiaDTO> clientesPorDia() {
        return vendaRepository.clientesPorDia().stream().map(obj -> {
            Date data = obj[0] instanceof java.sql.Date
                    ? new Date(((java.sql.Date) obj[0]).getTime())
                    : (Date) obj[0];

            return new RelatorioClientesPorDiaDTO((java.sql.Date) data, ((Long) obj[1]).intValue());
        }).collect(Collectors.toList());
    }

    public List<ConsumoClienteDTO> listarConsumoClientesPorPeriodo(LocalDate inicio, LocalDate fim) {
        return vendaRepository.buscarConsumoClientes(inicio, fim);
    }

    public List<TicketMedioDTO> listarTicketMedioPorPeriodo(LocalDate inicio, LocalDate fim) {
        return vendaRepository.buscarTicketMedioClientes(inicio, fim);
    }
}
