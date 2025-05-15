package com.example.les_api.service;

import org.springframework.stereotype.Service;

import javax.print.*;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.Copies;

@Service
public class BarcodePrintService {

    public void imprimirComandoZPL(int quantidade, String codigo) {
        try {
            PrintService[] services = PrintServiceLookup.lookupPrintServices(null, null);
            if (services.length == 0) {
                System.err.println("Nenhuma impressora encontrada.");
                return;
            }

            PrintService impressora = null;
            for (PrintService service : services) {
                if (service.getName().contains("Tally Dascom DL-200Z")) {
                    impressora = service;
                    break;
                }
            }

            if (impressora == null) {
                System.err.println("Impressora 'Tally Dascom DL-200Z' não encontrada.");
                return;
            }

            DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
            PrintRequestAttributeSet atributos = new HashPrintRequestAttributeSet();
            atributos.add(new Copies(1));

            int total = quantidade;
            int index = 0;

            while (total > 0) {
                int etiquetasNesteBloco = Math.min(3, total);
                String zplCorpo = gerarComandoEtiquetas(etiquetasNesteBloco, codigo, index);
                String zplCommand = "^XA\n^BY2\n" + zplCorpo + "^XZ";

                byte[] zplBytes = zplCommand.getBytes();
                Doc doc = new SimpleDoc(zplBytes, flavor, null);
                impressora.createPrintJob().print(doc, atributos);

                total -= etiquetasNesteBloco;
                index += etiquetasNesteBloco;
            }

            System.out.println("Comando ZPL enviado para impressão em blocos!");

        } catch (Exception e) {
            System.err.println("Erro ao imprimir: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private String gerarComandoEtiquetas(int quantidade, String codigo, int offset) {
        StringBuilder zplBuilder = new StringBuilder();
        int[] posicoesX = {40, 330, 600}; // centralizado mais à esquerda
        int posY = 30;

        for (int i = 0; i < quantidade; i++) {
            int coluna = i % 3;
            int posX = posicoesX[coluna];

            zplBuilder.append("^FO")
                    .append(posX).append(",").append(posY)
                    .append("^BEN,100,Y,N,N^FD")
                    .append(codigo)
                    .append("^FS\n");
        }

        return zplBuilder.toString();
    }
}
