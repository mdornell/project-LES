package com.example.les_api.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.produto.Produto;
import com.example.les_api.domain.venda.ItemVenda;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.RelatorioClientesPorDiaDTO;
import com.example.les_api.dto.VendaDTO;
import com.example.les_api.repository.ClienteRepository;
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

    @Transactional
    public Venda salvar(VendaDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setDescricaoVenda(dto.getDescricaoVenda());
        venda.setDataHora(new Date());

        List<ItemVenda> itens = dto.getItens().stream().map(itemDto -> {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            // Atualiza a quantidade do produto
            int novaQuantidade = produto.getQuantidade() - itemDto.getQuantidade();
            if (novaQuantidade < 0) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }
            produto.setQuantidade(novaQuantidade);
            produtoRepository.save(produto);

            ItemVenda item = new ItemVenda();
            item.setProdutoId(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setCusto(itemDto.getCusto());
            item.setVenda(venda);
            return item;
        }).collect(Collectors.toList());

        venda.setItens(itens);

        // Calcula o valor total da venda
        Double valorTotal = itens.stream()
                .mapToDouble(ItemVenda::getCusto)
                .sum();
        venda.setValorTotal(valorTotal);

        // Atualiza o saldo do cliente
        cliente.setSaldo(cliente.getSaldo() - valorTotal);
        clienteRepository.save(cliente);

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
}
