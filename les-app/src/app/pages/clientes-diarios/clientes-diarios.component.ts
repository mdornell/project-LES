import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendaService } from '../../services/venda.service';
import { Cliente } from '../../types/cliente';
import { Venda } from '../../types/venda';

@Component({
    selector: 'app-clientes-diarios',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './clientes-diarios.component.html',
    styleUrl: './clientes-diarios.component.scss'
})
export class ClientesDiariosComponent {

    dataSelecionada: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    vendasFiltradas: {
        cliente: Cliente;
        valorTotal: number;
        dataHora: string;
    }[] = [];
    isLoading: boolean = false; // Added isLoading property

    constructor(private vendaService: VendaService) {
    }

    ngOnInit(): void {
        this.carregarVendas();
    }

    carregarVendas(): void {
        this.isLoading = true; // Set isLoading to true when loading starts
        this.vendaService.list().subscribe({
            next: (vendas: Venda[]) => {
                const dataFiltro = new Date(this.dataSelecionada);
                this.vendasFiltradas = vendas
                    .filter(v => {
                        const dataVenda = new Date(v.dataHora);
                        return (
                            dataVenda.getFullYear() === dataFiltro.getFullYear() &&
                            dataVenda.getMonth() === dataFiltro.getMonth() &&
                            dataVenda.getDate() === dataFiltro.getDate()
                        );
                    })
                    .map(v => ({
                        cliente: v.cliente,
                        valorTotal: v.valorTotal,
                        dataHora: new Date(v.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    }))
                    .sort((a, b) => a.dataHora.localeCompare(b.dataHora)); // ordena por horário
            },
            error: () => {
                // Handle error if needed
            },
            complete: () => {
                this.isLoading = false; // Set isLoading to false when loading is complete
            }
        });
    }
}
