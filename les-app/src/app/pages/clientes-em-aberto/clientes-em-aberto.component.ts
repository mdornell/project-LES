import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.carregarClientes();
    }

    carregarClientes(): void {
        this.clienteService.listClientesEmAberto().subscribe(clientes => {
            const agrupados: { [nome: string]: { nome: string; saldo: number; dias: number } } = {};

            clientes.forEach((cliente: any) => {
                if (!agrupados[cliente.nome]) {
                    agrupados[cliente.nome] = {
                        nome: cliente.nome,
                        saldo: cliente.valor,
                        dias: cliente.dias
                    };
                } else {
                    agrupados[cliente.nome].saldo += cliente.valor;
                    agrupados[cliente.nome].dias = Math.max(agrupados[cliente.nome].dias, cliente.dias);
                }
            });

            this.clientesEmAberto = Object.values(agrupados);
        });
    }

    carregarClientesDia(dias: number): void {
        this.clienteService.listClientesEmAberto().subscribe(clientes => {
            const agrupados: { [nome: string]: { nome: string; saldo: number; dias: number } } = {};

            clientes.forEach((cliente: any) => {
                if (!agrupados[cliente.nome]) {
                    agrupados[cliente.nome] = {
                        nome: cliente.nome,
                        saldo: cliente.valor,
                        dias: cliente.dias
                    };
                } else {
                    agrupados[cliente.nome].saldo += cliente.valor;
                    agrupados[cliente.nome].dias = Math.max(agrupados[cliente.nome].dias, cliente.dias);
                }
            });

            // Filtra apenas os clientes com dias >= ao parâmetro, mas mantém o saldo total
            this.clientesEmAberto = Object.values(agrupados).filter(cliente => cliente.dias >= dias);
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
        doc.text("Relatório de Clientes em Aberto", 105, 15, { align: "center" });

        autoTable(doc, { html: table, startY: 25 });

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
