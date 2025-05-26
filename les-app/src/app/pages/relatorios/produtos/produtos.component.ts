import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
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
        descricao: string;
        custo: number;
        venda: number;
        lucro: number;
        codigo: string;
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
                console.log(this.linhas)
                this.linhas = [];
                console.log(vendas)
                vendasFiltradas.forEach(venda => {
                    venda.itens.forEach(item => {
                        // Buscando o produto pelo id no service
                        this.produtoService.listById(item.produtoId).subscribe({
                            next: (produto) => {
                                if (produto) {
                                    this.linhas.push({
                                        descricao: produto.nome,
                                        custo: item.custo,
                                        venda: produto.valorVenda,
                                        lucro: produto.valorVenda - item.custo,
                                        codigo: produto.codigoBarras
                                    });
                                }
                            },
                            error: () => {
                                console.error(`Erro ao buscar produto com ID ${item.produtoId}`);
                            }
                        });
                    });
                });

                this.isLoading = false;
            },
            error: () => {
                console.error('Erro ao buscar vendas');
                this.isLoading = false;
            }
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
        doc.text("Relatório de Produtos", 105, 15, { align: "center" });

        // @ts-ignore
        autoTable(doc, { html: table, startY: 25 });

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
