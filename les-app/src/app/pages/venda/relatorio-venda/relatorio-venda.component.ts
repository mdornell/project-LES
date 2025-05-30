import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../types/venda';

@Component({
    selector: 'app-relatorio-venda',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './relatorio-venda.component.html',
    styleUrl: './relatorio-venda.component.scss'
})
export class RelatorioVendaComponent {
    vendas: Venda[] = [];
    produtosMap = new Map<number, string>();
    carregando = true;

    constructor(
        private vendaService: VendaService,
        private produtoService: ProdutoService
    ) { }

    ngOnInit(): void {
        // Primeiro carrega os produtos
        this.produtoService.list().subscribe({
            next: (produtos) => {
                produtos.forEach(prod => {
                    this.produtosMap.set(prod._id, prod.nome);
                });

                // Depois carrega as vendas
                this.vendaService.list().subscribe({
                    next: (dados) => {
                        this.vendas = dados;
                        this.carregando = false;
                    },
                    error: (erro) => {
                        console.error('Erro ao buscar vendas:', erro);
                        this.carregando = false;
                    }
                });
            },
            error: (erro) => {
                console.error('Erro ao buscar produtos:', erro);
                this.carregando = false;
            }
        });
    }

    calcularTotalItens(venda: Venda): number {
        return venda.itens.reduce((soma, item) => soma + item.quantidade * item.custo, 0);
    }

    getNomeProduto(produtoId: number): string {
        return this.produtosMap.get(produtoId) || 'Produto não encontrado';
    }
}
