import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
                this.vendasFiltradas = vendas
                    .filter(v => {
                        const dataVenda = new Date(v.dataHora);
                        return dataVenda >= filtroInicio && dataVenda <= filtroFim;
                    })
                    .map(v => ({
                        cliente: v.cliente.nome,
                        valorTotal: v.valorTotal,
                        hora: new Date(v.dataHora).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }))
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

        // @ts-ignore
        const doc = new window.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // @ts-ignore
        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Clientes Diários", 105, 15, { align: "center" });

        // @ts-ignore
        window.autoTable(doc, { html: table, startY: 25 });

        // Abre o PDF em nova aba
        // @ts-ignore
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
