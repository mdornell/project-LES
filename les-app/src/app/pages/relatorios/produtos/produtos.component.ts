import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { VendaService } from '../../../services/venda.service';
import { Produto } from '../../../types/produto';

@Component({
    selector: 'app-produtos',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './produtos.component.html',
    styleUrl: './produtos.component.scss'
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

    produtos: Produto[] = [];

    constructor(
        private vendaService: VendaService,
        private produtoService: ProdutoService
    ) { }

    gerarRelatorio(): void {
        this.produtoService.list().subscribe(produtos => {
            this.produtos = produtos;
            this.vendaService.list().subscribe(vendas => {
                const inicioDate = new Date(this.inicio);
                const fimDate = new Date(this.fim);

                const vendasFiltradas = vendas.filter(v => {
                    const dataVenda = new Date(v.dataHora);
                    return dataVenda >= inicioDate && dataVenda <= fimDate;
                });

                this.linhas = [];

                vendasFiltradas.forEach(venda => {
                    venda.itens.forEach(item => {
                        const produto = this.produtos.find(p => p._id === item.produtoId);
                        if (produto) {
                            this.linhas.push({
                                descricao: produto.nome,
                                custo: item.custo,
                                venda: produto.preco,
                                lucro: produto.preco - item.custo,
                                codigo: produto.codigoBarras
                            });
                        }
                    });
                });
            });
        });
    }
}
