import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VendaService } from '../../services/venda.service';

interface ResumoCliente {
    nome: string;
    valorVendido: number;
    saldo: number;
    ultimaCompra: string;
}

@Component({
    selector: 'app-resumo-cliente',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './resumo-cliente.component.html',
    styleUrl: './resumo-cliente.component.scss'
})
export class ResumoClienteComponent {

    resumoClientes: any[] = [];

    constructor(
        private readonly vendaService: VendaService,
    ) {
    }

    ngOnInit() {
        this.loadResumoClientes();
    }

    loadResumoClientes() {
        this.vendaService.getResumoClientes().subscribe({
            next: (resumo: ResumoCliente[]) => {
                this.resumoClientes = resumo;
            },
            error: (err) => {
                // Handle error as needed
                console.error('Erro ao carregar resumo de clientes', err);
            }
        });
    }

}
