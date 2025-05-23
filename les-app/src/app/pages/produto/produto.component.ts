import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BarcodeService } from '../../services/bar-code.service';
import { ProdutoService } from '../../services/produto.service';
import { BarCode } from '../../types/barCode';
import { Produto } from '../../types/produto';
import { ProdutoListComponent } from './produto-list/produto-list.component';

@Component({
    selector: 'app-produto',
    standalone: true,
    imports: [
        ProdutoListComponent,
        CommonModule,
        FormsModule
    ],
    templateUrl: './produto.component.html',
    styleUrl: './produto.component.scss'
})
export class ProdutoComponent {

    produtos$: Observable<Produto[]>;
    produtoSelected: Produto | null = null;

    quantidade: number = 1;

    constructor(
        private produtoService: ProdutoService,
        private barcodeService: BarcodeService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.produtos$ = this.produtoService.list();
    }

    ngOnInit() {
    }

    onProdutoSelected(produto: Produto) {
        this.produtoSelected = produto;
    }

    onDelete() {
        if (this.produtoSelected?._id) {
            this.produtoService.remove(this.produtoSelected).
                subscribe(() => {
                    this.produtos$ = this.produtoService.list();
                });
        }
        this.produtoSelected = null;
    }

    confirmarImpressao() {
        if (this.produtoSelected && this.quantidade > 0) {
            const dto: BarCode = {
                codigo: this.produtoSelected.codigoBarras,
                quantidade: this.quantidade
            };

            this.barcodeService.imprimir(dto).subscribe({
                next: () => {
                    console.log('Impressão enviada com sucesso');
                },
                error: (err) => {
                    console.error('Erro ao imprimir:', err);
                }
            });

            this.produtoSelected = null;
            this.quantidade = 1;  // Resetar quantidade após imprimir
        }
    }

    onRelatorio(): void {
        // Seleciona a tabela de produtos pelo id ou classe no HTML
        const table = document.querySelector('table');
        if (!table) {
            alert('Tabela de produtos não encontrada!');
            return;
        }

        // @ts-ignore
        const doc = new window.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Produtos", 105, 15, { align: "center" });

        // @ts-ignore
        window.autoTable(doc, { html: table, startY: 25 });

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }
}
