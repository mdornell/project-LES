import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { forkJoin, map } from 'rxjs';
import { ProdutoService } from '../../../services/produto.service';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../types/venda';



@Component({
    selector: 'app-produtos',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss'] // Fixed property name
})
export class ProdutosComponent {

    inicio: string = new Date().toISOString().split('T')[0];
    fim: string = new Date().toISOString().split('T')[0];

    linhas: {
        codigo: string;
        descricao: string;
        custo: number;
        venda: number;
        lucro: number;
        qtd: number;
    }[] = [];

    isLoading = false;

    constructor(
        private vendaService: VendaService,
        private produtoService: ProdutoService
    ) { }

    gerarRelatorio(): void {
        if (!this.inicio || !this.fim) {
            console.error('Informe as datas de início e fim.');
            return;
        }

        const inicioDate = new Date(this.inicio);
        const fimDate = new Date(this.fim);
        fimDate.setHours(23, 59, 59, 999);

        this.isLoading = true;

        this.vendaService.list().subscribe({
            next: (vendas: Venda[]) => {
                const vendasFiltradas = vendas.filter(v => {
                    const dataVenda = new Date(v.dataHora);
                    return dataVenda >= inicioDate && dataVenda <= fimDate;
                });

                // Agrupar itens por produtoId e somar apenas a quantidade
                const itensMap = new Map<string, { qtd: number; produtoId: string }>();
                vendasFiltradas.forEach(venda => {
                    venda.itens.forEach(item => {
                        const key: string = String(item.produtoId);
                        if (!itensMap.has(key)) {
                            itensMap.set(key, { qtd: 0, produtoId: String(item.produtoId) });
                        }
                        const entry = itensMap.get(key)!;
                        entry.qtd += item.quantidade ?? 1;
                    });
                });

                const requisicoes = Array.from(itensMap.values()).map(itemAgrupado =>
                    this.produtoService.listById(Number(itemAgrupado.produtoId)).pipe(
                        map(produtoResponse => ({
                            id: itemAgrupado.produtoId,
                            descricao: produtoResponse.nome,
                            custo: produtoResponse.valorCusto,
                            venda: produtoResponse.valorVenda,
                            lucro: (produtoResponse.valorVenda * itemAgrupado.qtd),
                            codigo: produtoResponse.codigoBarras,
                            qtd: itemAgrupado.qtd
                        }))
                    )
                );

                forkJoin(requisicoes).subscribe({
                    next: (linhasFormatadas) => {
                        this.linhas = linhasFormatadas;
                        this.isLoading = false;
                    },
                    error: (err) => {
                        console.error('Erro ao buscar produtos', err);
                        this.isLoading = false;
                    }
                });
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
        doc.text("Relatório DRE Diário", 105, 15, { align: "center" });

        autoTable(doc, { html: table, startY: 25 });

        // Abre o PDF em nova aba
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
