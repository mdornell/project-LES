import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VendaService } from '../../services/venda.service';

interface RelatorioItem {
    nomeCliente: string;
    ticketMedio: number;
}

@Component({
    selector: 'app-ticket-medio',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './ticket-medio.component.html',
    styleUrls: ['./ticket-medio.component.scss']
})
export class TicketMedioComponent implements OnInit {

    dataInicio: string = new Date().toISOString().slice(0, 10);
    dataFim: string = new Date().toISOString().slice(0, 10);

    dados: RelatorioItem[] = [];

    constructor(
        private vendaService: VendaService
    ) {
    }

    ngOnInit() {
        this.carregarDados();
    }

    carregarDados(): void {
        if (this.dataInicio && this.dataFim) {
            this.vendaService.getTicketMedioClientes(this.dataInicio, this.dataFim).subscribe(
                (dados: any) => {
                    this.dados = dados as RelatorioItem[];
                }
            );
        }
    }

    onRelatorio(): void {
        // Seleciona a tabela de produtos pelo id ou classe no HTML
        const table = document.querySelector('table');
        if (!table) {
            alert('Tabela de produtos não encontrada!');
            return;
        }

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Produtos", 105, 15, { align: "center" });

        // @ts-ignore
        autoTable(doc, { html: table, startY: 25 });

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
