import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../types/venda';

@Component({
    selector: 'app-dre-diario',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './dre-diario.component.html',
    styleUrl: './dre-diario.component.scss'
})
export class DreDiarioComponent {
    resumoDiario: {
        data: string;
        entrada: number;
        saida: number;
        clientes: number;
    }[] = [];

    saldoInicial = 0;
    saldoFinal = 0;
    isLoading = false; // Adicionado

    constructor(private vendaService: VendaService) { }

    ngOnInit(): void {
        this.carregarVendas();
    }

    carregarVendas(): void {
        this.isLoading = true; // Inicia o carregamento
        this.vendaService.list().subscribe((vendas: Venda[]) => {
            this.processarResumo(vendas);
            this.isLoading = false; // Finaliza o carregamento
        }, () => {
            this.isLoading = false; // Finaliza o carregamento em caso de erro
        });
    }

    processarResumo(vendas: Venda[]): void {
        const agrupado = vendas.reduce((acc, venda) => {
            const data = new Date(venda.dataHora).toLocaleDateString('pt-BR');
            if (!acc[data]) {
                acc[data] = [];
            }
            acc[data].push(venda);
            return acc;
        }, {} as Record<string, Venda[]>);

        this.resumoDiario = Object.entries(agrupado).map(([data, vendasDoDia]) => {
            const entrada = vendasDoDia.reduce((soma, v) => soma + v.valorTotal, 0);
            const clientesUnicos = new Set(vendasDoDia.map(v => v.cliente._id)).size;
            return {
                data,
                entrada,
                saida: 0, // você pode substituir por valor real se desejar
                clientes: clientesUnicos
            };
        });

        this.saldoInicial = 0;
        this.saldoFinal = this.resumoDiario.reduce((soma, r) => soma + r.entrada - r.saida, 0);
    }
}
