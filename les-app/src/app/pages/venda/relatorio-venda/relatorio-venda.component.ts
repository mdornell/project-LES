import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../types/venda';

@Component({
    selector: 'app-relatorio-venda',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './relatorio-venda.component.html',
    styleUrl: './relatorio-venda.component.scss'
})
export class RelatorioVendaComponent {
    vendas: Venda[] = [];
    produtosMap = new Map<number, string>();
    carregando = true;
    dataInicio?: string;
    dataFim?: string;

    constructor(
        private vendaService: VendaService,
        private produtoService: ProdutoService
    ) { }

    ngOnInit(): void {
        this.carregarProdutosEVendas();
    }

    carregarProdutosEVendas(): void {
        this.carregando = true;
        this.produtoService.list().subscribe({
            next: (produtos) => {
                produtos.forEach(prod => {
                    this.produtosMap.set(prod._id, prod.nome);
                });
                this.buscarVendas();
            },
            error: (erro) => {
                console.error('Erro ao buscar produtos:', erro);
                this.carregando = false;
            }
        });
    }

    buscarVendas(): void {
        this.carregando = true;
        this.vendaService.list().subscribe({
            next: (dados) => {
                const vendasFiltradas = this.filtrarPorData(dados);
                this.vendas = vendasFiltradas.sort((a, b) =>
                    new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
                );
                this.carregando = false;
            },
            error: (erro) => {
                console.error('Erro ao buscar vendas:', erro);
                this.carregando = false;
            }
        });
    }


    filtrarPorData(vendas: Venda[]): Venda[] {
        if (!this.dataInicio && !this.dataFim) return vendas;
        return vendas.filter(venda => {
            const dataVenda = new Date(venda.dataHora);
            const inicio = this.dataInicio ? new Date(this.dataInicio) : null;
            const fim = this.dataFim ? new Date(this.dataFim) : null;
            if (inicio && dataVenda < inicio) return false;
            if (fim && dataVenda > fim) return false;
            return true;
        });
    }

    calcularTotalItens(venda: Venda): number {
        return venda.itens.reduce((soma, item) => soma + item.quantidade * item.custo, 0);
    }

    getNomeProduto(produtoId: number): string {
        return this.produtosMap.get(produtoId) || 'Produto não encontrado';
    }
}
