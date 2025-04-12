package com.example.les_api.service;

import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.produto.Produto;
import com.example.les_api.domain.venda.ItemVenda;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.ItemVendaDTO;
import com.example.les_api.dto.VendaDTO;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.ProdutoRepository;
import com.example.les_api.repository.VendaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    @Transactional
    public Venda salvar(VendaDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setDescricaoVenda(dto.getDescricaoVenda());
        venda.setDataHora(new Date());

        List<ItemVenda> itens = dto.getItens().stream().map(itemDto -> {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItemVenda item = new ItemVenda();
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setCusto(itemDto.getCusto());
            item.setVenda(venda); // RELACIONAMENTO CORRETO
            return item;
        }).collect(Collectors.toList());

        venda.setItens(itens);

        return vendaRepository.save(venda);
    }

    public List<Venda> listarTodas() {
        return vendaRepository.findAll();
    }

    public Venda buscarPorId(Integer id) {
        return vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
    }

    public void deletar(Integer id) {
        vendaRepository.deleteById(id);
    }
}
