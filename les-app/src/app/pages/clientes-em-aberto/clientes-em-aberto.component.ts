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

    filtroDias: 'todos' | '-30' | '+30' = 'todos';

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.carregarClientes();
    }

    carregarClientes(): void {
        this.clienteService.listClientesEmAberto().subscribe(clientes => {
            let filtrados = clientes;

            if (this.filtroDias === '-30') {
                filtrados = clientes.filter(c => c.dias <= 30);
            } else if (this.filtroDias === '+30') {
                filtrados = clientes.filter(c => c.dias > 30);
            }

            // Agrupamento por nome, somando saldo e mantendo o maior dias
            const acumulados: { [nome: string]: { nome: string; saldo: number; dias: number } } = {};

            filtrados.forEach(c => {
                if (!acumulados[c.nome]) {
                    acumulados[c.nome] = { nome: c.nome, saldo: 0, dias: c.dias };
                }
                acumulados[c.nome].saldo += c.valor;
                if (c.dias > acumulados[c.nome].dias) {
                    acumulados[c.nome].dias = c.dias;
                }
            });

            this.clientesEmAberto = Object.values(acumulados);
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
