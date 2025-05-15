import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

    dataInicio: string = '';
    dataFim: string = '';

    resumoDiario: {
        data: string;
        entrada: string;
        saida: string;
        clientes: String;
    }[] = [];

    saldoInicial = 0;
    saldoFinal = 0;
    isLoading = false;

    constructor(private vendaService: VendaService) { }

    ngOnInit(): void {
        this.carregarVendas();
    }

    carregarVendas(): void {
        this.isLoading = true;
        this.vendaService.list().subscribe({
            next: (vendas: Venda[]) => {
                this.processarResumo(vendas);
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            }
        });
    }

    processarResumo(vendas: Venda[]): void {
        const detalhes = vendas.map(venda => {
            const data = new Date(venda.dataHora).toLocaleDateString('pt-BR');
            const hora = new Date(venda.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            return {
                data,
                entrada: hora,
                saida: hora,
                clientes: venda.cliente.nome
            };
        });

        this.resumoDiario = detalhes;

        this.saldoInicial = 0;
        this.saldoFinal = 0; // Adjusted as entrada and saida are now times
    }

    filtrarVendasPorIntervalo(): void {
        if (!this.dataInicio || !this.dataFim) {
            console.error('Data de início e fim devem ser preenchidas');
            return;
        }

        const inicio = new Date(this.dataInicio);
        const fim = new Date(this.dataFim);
        fim.setHours(23, 59, 59, 999);

        this.isLoading = true;
        this.vendaService.list().subscribe({
            next: (vendas: Venda[]) => {
                const vendasFiltradas = vendas.filter(v => {
                    const dataVenda = new Date(v.dataHora);
                    return dataVenda >= inicio && dataVenda <= fim;
                });
                this.processarResumo(vendasFiltradas);
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            }
        });
    }
}
