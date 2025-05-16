import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'app-clientes-em-aberto',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CurrencyPipe
    ],
    templateUrl: './clientes-em-aberto.component.html',
    styleUrls: ['./clientes-em-aberto.component.scss']
})
export class ClientesEmAbertoComponent {
    clientesEmAberto: {
        nome: string;
        saldo: number;
        dias: number;
    }[] = [];

    mostrarApenas30Dias: boolean = true;

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.carregarClientes();
    }

    // Esta função carrega os clientes em aberto a partir do serviço ClienteService.
    // Ela filtra clientes com saldo negativo, calcula os dias em aberto e aplica o filtro de 30 dias.
    // carregarClientes(): void {
    //     const hoje = new Date();

    //     this.clienteService.list().subscribe(clientes => {
    //         this.clientesEmAberto = clientes
    //             .filter(c => c.saldo < 0)
    //             .map(c => {
    //                 const dataCompra = hoje;
    //                 const dias = Math.floor((hoje.getTime() - dataCompra.getTime()) / (1000 * 60 * 60 * 24));
    //                 return { nome: c.nome, saldo: c.saldo, dias };
    //             })
    //             .filter(c => !this.mostrarApenas30Dias || c.dias <= 30);
    //     });
    // }

    // Esta função preenche a lista de clientes em aberto de forma estática.
    carregarClientes(): void {
        this.clientesEmAberto = [
            // Metade abaixo de 30 dias
            { nome: 'João Silva', saldo: 150.75, dias: 10 },
            { nome: 'Maria Souza', saldo: 200.00, dias: 25 },
            { nome: 'Ana Paula', saldo: 120.00, dias: 5 },
            { nome: 'Bruno Rocha', saldo: 80.25, dias: 15 },
            // Metade acima de 30 dias
            { nome: 'Carlos Lima', saldo: 50.50, dias: 35 },
            { nome: 'Fernanda Alves', saldo: 300.00, dias: 32 },
            { nome: 'Ricardo Gomes', saldo: 60.00, dias: 40 },
            { nome: 'Patrícia Mendes', saldo: 175.50, dias: 38 }
        ].filter(c => !this.mostrarApenas30Dias || c.dias <= 30);
    }
}