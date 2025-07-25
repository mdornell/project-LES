import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../types/venda';

@Component({
    selector: 'app-clientes-diarios',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './clientes-diarios.component.html',
    styleUrl: './clientes-diarios.component.scss'
})
export class ClientesDiariosComponent {

    dataSelecionada: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    vendasFiltradas: {
        cliente: String;
        valorTotal: number;
        hora: string;
    }[] = [];

    isLoading: boolean = false;

    constructor(private vendaService: VendaService) { }

    ngOnInit(): void {
        this.carregarVendas();
    }

    carregarVendas(): void {
        this.isLoading = true;

        const filtroInicio = new Date(this.dataSelecionada + 'T00:00:00');
        const filtroFim = new Date(this.dataSelecionada + 'T23:59:59');

        this.vendaService.list().subscribe({
            next: (vendas: Venda[]) => {
                // Filtra vendas por data
                const vendasFiltradas = vendas.filter(v => {
                    const dataVenda = new Date(v.dataHora);
                    return dataVenda >= filtroInicio && dataVenda <= filtroFim;
                });

                // Agrupa por cliente somando os valores
                const clientesMap = new Map<string, { cliente: string; valorTotal: number; hora: string }>();

                vendasFiltradas.forEach(v => {
                    const nomeCliente = v.cliente.nome;
                    const valor = v.valorTotal;
                    const hora = new Date(v.dataHora).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    if (clientesMap.has(nomeCliente)) {
                        const entry = clientesMap.get(nomeCliente)!;
                        entry.valorTotal += valor;
                        // Mantém a menor hora (primeira compra do dia)
                        if (hora < entry.hora) {
                            entry.hora = hora;
                        }
                    } else {
                        clientesMap.set(nomeCliente, {
                            cliente: nomeCliente,
                            valorTotal: valor,
                            hora
                        });
                    }
                });

                this.vendasFiltradas = Array.from(clientesMap.values())
                    .sort((a, b) => a.hora.localeCompare(b.hora));

                this.isLoading = false;
            },
            error: () => {
                console.error('Erro ao buscar vendas');
                this.isLoading = false;
            }
        });
    }


    onRelatorio(): void {
        // Seleciona a tabela pelo id ou classe no HTML
        const table = document.querySelector('table');
        if (!table) {
            alert('Tabela não encontrada!');
            return;
        }

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Clientes Diários", 105, 15, { align: "center" });

        autoTable(doc, { html: table, startY: 25 });

        // Abre o PDF em nova aba
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
