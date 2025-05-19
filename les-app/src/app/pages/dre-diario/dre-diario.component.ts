import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { ProdutoService } from '../../services/produto.service';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../types/venda';

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

                const requisicoes = vendasFiltradas.flatMap(venda =>
                    venda.itens.map(item => {
                        const produtoId = item.produtoId;
                        return this.produtoService.listById(produtoId).pipe(
                            map(produtoResponse => ({
                                id: produtoId,
                                descricao: produtoResponse.nome,
                                custo: item.custo,
                                venda: produtoResponse.preco,
                                lucro: produtoResponse.preco - item.custo,
                                codigo: produtoResponse.codigoBarras
                            }))
                        );
                    })
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
}
