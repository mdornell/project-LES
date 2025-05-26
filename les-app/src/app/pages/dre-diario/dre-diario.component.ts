import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-dre-diario',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './dre-diario.component.html',
    styleUrl: './dre-diario.component.scss'
})
export class DreDiarioComponent {

    dataInicio: string = '2025-02-01';
    dataFim: string = '2025-02-20';

    dados = [
        { data: '20/02/2025', entrada: 2140.52, saida: 0, clientes: 48 },
        { data: '19/02/2025', entrada: 1957.41, saida: 2000, clientes: 49 },
        { data: '18/02/2025', entrada: 1548.79, saida: 9600, clientes: 35 },
        { data: '17/02/2025', entrada: 2789.86, saida: 456.40, clientes: 51 },
        { data: '14/02/2025', entrada: 0, saida: 200, clientes: 52 },
        { data: '14/02/2025', entrada: 2456.87, saida: 0, clientes: 52 },
        { data: '13/02/2025', entrada: 1893.45, saida: 1400, clientes: 46 },
        { data: '12/02/2025', entrada: 3704.82, saida: 120, clientes: 59 },
    ];

    saldoInicial = 0;
    saldoFinal = 0;

    ngOnInit() {
        this.calcularSaldos();
    }

    calcularSaldos() {
        const entradas = this.dados.reduce((soma, d) => soma + d.entrada, 0);
        const saidas = this.dados.reduce((soma, d) => soma + d.saida, 0);
        this.saldoInicial = 9564.78; // Pode vir de outro lugar ou ser inicializado
        this.saldoFinal = this.saldoInicial + entradas - saidas;
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
        doc.text("Relatório DRE Diário", 105, 15, { align: "center" });

        autoTable(doc, { html: table, startY: 25 });

        // Abre o PDF em nova aba
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
