package com.example.les_api.service;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.les_api.domain.cliente.Acesso;
import com.example.les_api.domain.cliente.Cliente;
import com.example.les_api.domain.recarga.Recarga;
import com.example.les_api.domain.venda.Venda;
import com.example.les_api.dto.ClienteDTO;
import com.example.les_api.dto.ClienteEmAbertoDTO;
import com.example.les_api.dto.RecargaDTO;
import com.example.les_api.repository.AcessoRepository;
import com.example.les_api.repository.ClienteRepository;
import com.example.les_api.repository.RecargaRepository;
import com.example.les_api.repository.VendaRepository;

import jakarta.transaction.Transactional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private RecargaRepository recargaRepository;

    @Autowired
    private RecargaService recargaService;

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private AcessoRepository acessoRepository;

    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteDTO::new)
                .collect(Collectors.toList());
    }

    public ClienteDTO buscarPorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return new ClienteDTO(cliente);
    }

    public ClienteDTO buscarPorRFID(String rfid) {
        Cliente cliente = clienteRepository.findByCodigoRFID(rfid)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return new ClienteDTO(cliente);
    }

    public ClienteDTO salvar(Cliente cliente) {
        System.out.println(
                String.format(
                        "{\"nome\":\"%s\",\"email\":\"%s\",\"saldo\":%s,\"codigoRFID\":\"%s\",\"ativo\":%s,\"dataAniversario\":\"%s\"}",
                        cliente.getNome(),
                        cliente.getEmail(),
                        cliente.getSaldo(),
                        cliente.getCodigoRFID(),
                        cliente.isAtivo(),
                        cliente.getDataAniversario()));

        atualizarSaldoCliente(cliente, cliente.getSaldo());
        return new ClienteDTO(cliente);
    }

    public ClienteDTO atualizar(Integer id, Cliente atualizado) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(atualizado.getNome());
        cliente.setEmail(atualizado.getEmail());
        cliente.setCodigoRFID(atualizado.getCodigoRFID());
        cliente.setAtivo(atualizado.isAtivo());
        cliente.setDataAniversario(atualizado.getDataAniversario());

        atualizarSaldoCliente(cliente, atualizado.getSaldo());

        return new ClienteDTO(cliente);
    }

    @Transactional
    public void deletar(Integer clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // 1. Apagar todas as vendas diretamente ligadas ao cliente
        List<Venda> vendasCliente = vendaRepository.findByCliente(cliente);
        for (Venda venda : vendasCliente) {
            // Cascade ALL em itens já cuida do delete
            vendaRepository.delete(venda);
        }

        // 2. Apagar todas as vendas associadas a acessos do cliente
        List<Acesso> acessos = acessoRepository.findByCliente(cliente);
        for (Acesso acesso : acessos) {
            List<Venda> vendas = vendaRepository.findByAcesso(acesso);
            for (Venda venda : vendas) {
                vendaRepository.delete(venda); // Itens já vão por cascade
            }
        }

        // 3. Apagar todos os acessos
        acessoRepository.deleteAll(acessos);

        // 4. Apagar todas as recargas
        List<Recarga> recargas = recargaRepository.findByCliente(cliente);
        recargaRepository.deleteAll(recargas);

        // 5. Por fim, apagar o cliente
        clienteRepository.delete(cliente);
    }

    public List<ClienteDTO> buscarAniversariantes() {
        return clienteRepository.aniversariantesHoje()
                .stream()
                .map(ClienteDTO::new)
                .collect(Collectors.toList());
    }

    public List<ClienteEmAbertoDTO> listarClientesEmAberto(Optional<Integer> diasMinimos) {
        List<Venda> vendas = vendaRepository.findAll();
        Date hoje = new Date();

        return vendas.stream()
                .filter(v -> v.getValorTotal() != null && v.getCliente() != null)
                .map(v -> {
                    long dias = ChronoUnit.DAYS.between(
                            v.getDataHora().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                            hoje.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
                    return new ClienteEmAbertoDTO(v.getCliente().getId(),
                            v.getCliente().getNome(),
                            v.getValorTotal(),
                            dias);
                })
                .filter(c -> diasMinimos.isEmpty() || c.getDias() >= diasMinimos.get())
                .collect(Collectors.toList());
    }

    public List<Cliente> listarClientesAtivos() {
        return clienteRepository.findByAtivoTrue();
    }

    public List<Cliente> listarClientesComSaldoAbertoMaisDe30Dias() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -30);
        Date limite = cal.getTime();
        return clienteRepository.buscarClientesComSaldoAberto(limite);
    }

    public void atualizarSaldoCliente(Cliente cliente, double novoSaldo) {
        cliente.setSaldo(novoSaldo);

        if (novoSaldo < 0 && cliente.getDataVencimentoCartao() == null) {
            cliente.setDataVencimentoCartao(new Date()); // hoje
        }

        if (novoSaldo >= 0) {
            cliente.setDataVencimentoCartao(null); // limpa vencimento se quitado
        }

        clienteRepository.save(cliente);
    }

    public double valorDividasAPagar(Integer clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Busca todas as vendas do cliente
        List<Venda> todasAsVendas = vendaRepository.findAll();

        // Filtra apenas as não pagas do cliente informado
        List<Venda> pendentes = todasAsVendas.stream()
                .filter(v -> v.getCliente().getId().equals(clienteId) && !Boolean.TRUE.equals(v.isPaga()))
                .collect(Collectors.toList());

        if (pendentes.isEmpty()) {
            throw new RuntimeException("Nenhuma venda pendente para este cliente.");
        }

        // Soma o valor total das pendentes
        double total = pendentes.stream()
                .mapToDouble(Venda::getValorTotal)
                .sum();

        return total;
    }

    @Transactional
    public void quitarDividasDoCliente(Integer clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Busca todas as vendas do cliente
        List<Venda> todasAsVendas = vendaRepository.findAll();

        // Filtra apenas as não pagas do cliente informado
        List<Venda> pendentes = todasAsVendas.stream()
                .filter(v -> v.getCliente().getId().equals(clienteId) && !Boolean.TRUE.equals(v.isPaga()))
                .collect(Collectors.toList());

        if (pendentes.isEmpty()) {
            throw new RuntimeException("Nenhuma venda pendente para este cliente.");
        }

        // Soma o valor total das pendentes
        double total = pendentes.stream()
                .mapToDouble(Venda::getValorTotal)
                .sum();

        // Cria DTO de recarga e chama o método existente
        RecargaDTO recargaDTO = new RecargaDTO();
        recargaDTO.setClienteId(clienteId);
        recargaDTO.setValor(total);
        recargaService.registrarRecarga(recargaDTO);

        // Marcar todas as vendas como pagas
        pendentes.forEach(v -> v.setPaga(true));
        vendaRepository.saveAll(pendentes);
    }
}
