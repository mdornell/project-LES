import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';

interface RelatorioItem {
    nome: string;
    valor: number;
}

@Component({
    selector: 'app-ticket-medio',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './ticket-medio.component.html',
    styleUrl: './ticket-medio.component.scss'
})
export class TicketMedioComponent {
    inicio: string = '';
    fim: string = '';

    dados: RelatorioItem[] = [
        { nome: 'Marco Dornel', valor: 50 },
        { nome: 'Bruno Carvalho', valor: 50 },
        { nome: 'Rafael Pere', valor: 100 },
        { nome: 'Lucas Almeida', valor: 40 },
        { nome: 'Juliana Rocha', valor: 50 },
        { nome: 'Pedro Oliveira', valor: 20 },
        { nome: 'Ronan Jardim', valor: 150 },
        { nome: 'Larissa Silva', valor: 150 }
    ];

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
