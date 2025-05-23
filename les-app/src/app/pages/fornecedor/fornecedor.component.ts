import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../types/fornecedor';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';

@Component({
    selector: 'app-fornecedor',
    standalone: true,
    imports: [
        FornecedorListComponent,
        CommonModule
    ],
    templateUrl: './fornecedor.component.html',
    styleUrl: './fornecedor.component.scss'
})
export class FornecedorComponent {
    fornecedores$: Observable<Fornecedor[]>;
    fornecedorSelected: Fornecedor | null = null;

    constructor(
        private fornecedorService: FornecedorService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.fornecedores$ = this.fornecedorService.list();
    }

    ngOnInit() {
    }

    onFornecedorSelected(fornecedor: Fornecedor) {
        this.fornecedorSelected = fornecedor;
    }

    onDelete() {
        if (this.fornecedorSelected?._id) {
            this.fornecedorService.remove(this.fornecedorSelected)
                .subscribe(() => {
                    this.fornecedores$ = this.fornecedorService.list();
                });
        }
        this.fornecedorSelected = null;
    }

    onRelatorio(): void {
        // Seleciona a tabela de fornecedores pelo seletor adequado
        const table = document.querySelector('table');
        if (!table) {
            alert('Tabela de fornecedores não encontrada!');
            return;
        }

        // Cria o documento PDF
        const doc = new (window as any).jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Fornecedores", 105, 15, { align: "center" });

        // Usa autoTable para converter a tabela HTML em PDF
        (window as any).autoTable(doc, { html: table, startY: 25 });

        // Abre o PDF em nova aba
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
