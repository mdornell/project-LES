import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PagamentoFornecedorService } from '../../services/pagamento-fornecedor.service';
import { PagamentoFornecedor } from '../../types/pagamento-Fornecedor';
import { PagamentoFornecedorListComponent } from './pagamento-fornecedor-list/pagamento-fornecedor-list.component';

@Component({
    selector: 'app-pagamento-fornecedor',
    standalone: true,
    imports: [
        CommonModule,
        PagamentoFornecedorListComponent
    ],
    templateUrl: './pagamento-fornecedor.component.html',
    styleUrl: './pagamento-fornecedor.component.scss'
})
export class PagamentoFornecedorComponent {
    pagamentos$: Observable<PagamentoFornecedor[]>;
    pagamentos: PagamentoFornecedor[] = [];
    pagamentoSelected: PagamentoFornecedor | null = null;
    tabela: 'abertos' | 'concluidos' = 'abertos';

    constructor(
        private pagamentoService: PagamentoFornecedorService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.pagamentos$ = this.pagamentoService.list();
        this.pagamentos$.subscribe(pags => this.pagamentos = pags);
    }

    onEdit(pagamento: PagamentoFornecedor) {
        this.router.navigate(['edit', pagamento._id], { relativeTo: this.route });
    }

    onDelete() {
        if (this.pagamentoSelected?._id) {
            this.pagamentoService.remove(this.pagamentoSelected).subscribe(() => {
                this.pagamentos$ = this.pagamentoService.list();
                this.pagamentos$.subscribe(pags => this.pagamentos = pags);
                this.pagamentoSelected = null;
            });
        }
    }

    onSelect(pagamento: PagamentoFornecedor) {
        this.pagamentoSelected = pagamento;
        this.onDelete();
    }
}
