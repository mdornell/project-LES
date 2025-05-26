import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../types/cliente';
import { ClienteListComponent } from './cliente-list/cliente-list.component';



@Component({
    selector: 'app-cliente',
    standalone: true,
    imports: [
        ClienteListComponent,
        CommonModule
    ],
    templateUrl: './cliente.component.html',
    styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

    clientes$: Observable<Cliente[]>;
    clienteSelected: Cliente | null = null;



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clienteService: ClienteService
    ) {
        this.clientes$ = this.clienteService.list();
    }

    ngOnInit() {
    }

    onClienteSelected(cliente: Cliente) {
        this.clienteSelected = cliente;
    }

    onDelete() {
        if (this.clienteSelected?._id) {
            this.clienteService.remove(this.clienteSelected).
                subscribe(() => {
                    this.clientes$ = this.clienteService.list();
                });
        }
        this.clienteSelected = null;
    }




    onRelatorio(): void {
        // Seleciona a tabela pelo id ou classe no HTML
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
        doc.text("Relatório de Clientes", 105, 15, { align: "center" });

        // Usa autoTable para converter a tabela HTML em PDF
        autoTable(doc, { html: table, startY: 25 });

        // Abre o PDF em nova aba
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }

}
