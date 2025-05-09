package com.example.les_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

@Service
public class TerminalListenerService implements CommandLineRunner {

    @Autowired
    private ClienteService clienteService;

    private static final String ESC = "\u001B"; // Código ESC

    @Override
    public void run(String... args) throws Exception {
        try (ServerSocket serverSocket = new ServerSocket(5000)) {
            System.out.println("Servidor do Micro Terminal Jaia escutando na porta 5000...");

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Conexao recebida do terminal.");

                InputStream in = clientSocket.getInputStream();
                OutputStream out = clientSocket.getOutputStream();

                try {
                    while (true) { // Loop contínuo para várias consultas

                        limparTela(out);

                        // Mensagem inicial
                        enviarTexto(out, "Digite o codigo:\r\n");

                        // Ler os dígitos e ecoar
                        StringBuilder codigoRFID = new StringBuilder();
                        int caractere;
                        while ((caractere = in.read()) != -1) {
                            if (caractere == '\n' || caractere == '\r') {
                                break;
                            }
                            codigoRFID.append((char) caractere);
                            out.write(caractere); // Ecoa a digitação
                            out.flush();
                        }

                        if (codigoRFID.length() == 0) {
                            System.out.println("Nenhum codigo recebido, encerrando conexão...");
                            break;
                        }

                        System.out.println("Codigo RFID recebido: " + codigoRFID.toString());

                        // Buscar cliente
                        String resposta;
                        try {
                            var clienteDTO = clienteService.buscarPorRFID(codigoRFID.toString());
                            resposta = "Saldo: R$ " + clienteDTO.getSaldo();
                        } catch (RuntimeException e) {
                            resposta = "Cliente nao encontrado";
                        }

                        // Limpar a tela
                        limparTela(out);

                        // Mostrar saldo
                        enviarTexto(out, resposta + "\r\n");

                        // AGUARDAR TEMPO para o cliente ler o saldo
                        Thread.sleep(5000); // <<< 5 segundos (5000ms)

                        // Depois dos 5 segundos, recomeça o ciclo
                    }
                } catch (Exception ex) {
                    System.out.println("Erro durante a comunicacao: " + ex.getMessage());
                } finally {
                    clientSocket.close();
                    System.out.println("Conexao encerrada.");
                }
            }
        }
    }

    private void limparTela(OutputStream out) throws Exception {
        String limpar = ESC + "[2J" + ESC + "[H"; // Limpa tudo + volta cursor
        out.write(limpar.getBytes());
        out.flush();
    }

    private void enviarTexto(OutputStream out, String texto) throws Exception {
        out.write(texto.getBytes());
        out.flush();
    }
}
