import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PagamentoFornecedorService } from '../../services/pagamento-fornecedor.service';
import { VendaService } from '../../services/venda.service';


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

    dataInicio: string = new Date().toISOString().slice(0, 10);
    dataFim: string = new Date().toISOString().slice(0, 10);
    saldoInicial = 0;
    dados: any[] = [];


    constructor(
        private vendasService: VendaService,
        private pagamentosFornecedorService: PagamentoFornecedorService
    ) { }

    ngOnInit() {
        this.carregarDados();
    }

    carregarDados() {
        this.vendasService.getDRE(this.dataInicio, this.dataFim).subscribe((res: any) => {
            // res: { saldoAnterior: number, relatorio: Array<{ data, receber, pagar, resultado, saldo }> }
            this.saldoInicial = res.saldoAnterior ?? 0;
            this.dados = (res.relatorio ?? []).map((item: any) => ({
                data: item.data,
                entrada: item.receber,
                saida: item.pagar,
                resultado: item.resultado,
                saldo: item.saldo
            }));
            // Ordena os dados da data mais recente para a mais antiga
            // this.dados.sort((a, b) => {
            //     const [da, ma, ya] = a.data.split('/').map(Number);
            //     const [db, mb, yb] = b.data.split('/').map(Number);
            //     return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
            // });
        });
    }

    onRelatorio(): void {
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

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }

}
