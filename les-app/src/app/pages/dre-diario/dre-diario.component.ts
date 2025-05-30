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

    dataInicio: string = '2025-02-01';
    dataFim: string = '2025-02-20';

    vendas: any[] = [];
    pagamentosFornecedor: any[] = [];

    dados: any[] = [];
    saldoInicial = 0;
    saldoFinal = 0;

    constructor(
        private vendasService: VendaService,
        private pagamentosFornecedorService: PagamentoFornecedorService
    ) { }

    ngOnInit() {
        this.carregarDados();
    }

    carregarDados() {
        this.vendasService.list().subscribe(vendas => {
            this.vendas = vendas;
            this.pagamentosFornecedorService.list().subscribe(pagamentos => {
                this.pagamentosFornecedor = pagamentos;
                this.gerarDados();
                // Ordena os dados da data mais recente para a mais antiga
                this.dados.sort((a, b) => {
                    const [da, ma, ya] = a.data.split('/').map(Number);
                    const [db, mb, yb] = b.data.split('/').map(Number);
                    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
                });
                this.calcularSaldos();
            });
        });
    }

    gerarDados() {
        const datasSet = new Set([
            ...this.vendas.map(v => v.dataHora),
            ...this.pagamentosFornecedor.map(p => p.dataVencimento)
        ]);
        const datas = Array.from(datasSet).sort((a, b) => {
            const [da, ma, ya] = a.split('/').map(Number);
            const [db, mb, yb] = b.split('/').map(Number);
            return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
        });

        this.dados = datas.map(data => {
            const vendasDia = this.vendas.filter(v => v.dataHora === data);
            const pagamentosDia = this.pagamentosFornecedor.filter(p => p.dataVencimento === data);
            return {
                data,
                entrada: vendasDia.reduce((s, v) => s + v.valorTotal, 0),
                saida: pagamentosDia.reduce((s, p) => s + p.valorPago, 0),
            };
        });
    }

    calcularSaldos() {
        const entradas = this.dados.reduce((soma, d) => soma + d.entrada, 0);
        const saidas = this.dados.reduce((soma, d) => soma + d.saida, 0);
        this.saldoInicial = 9564.78; // Pode vir de outro lugar ou ser inicializado
        this.saldoFinal = this.saldoInicial + entradas - saidas;
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
