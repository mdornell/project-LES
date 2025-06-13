import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagamentoFornecedor } from '../../../types/pagamento-Fornecedor';

@Component({
    selector: 'app-pagamento-fornecedor-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagamento-fornecedor-list.component.html',
    styleUrl: './pagamento-fornecedor-list.component.scss'
})
export class PagamentoFornecedorListComponent {
    @Input() pagamentos: PagamentoFornecedor[] = [];
    @Output() selecionar = new EventEmitter<PagamentoFornecedor>();
    @Output() editar = new EventEmitter<PagamentoFornecedor>();

    tabela: 'abertos' | 'concluidos' = 'abertos';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    get pagamentosFiltrados(): PagamentoFornecedor[] {
        if (this.tabela === 'concluidos') {
            return this.pagamentos.filter(p => !!p.dataPagamento);
        }
        return this.pagamentos.filter(p => !p.dataPagamento);
    }

    onSelect(p: PagamentoFornecedor) {
        this.selecionar.emit(p);
    }

    onEdit(p: PagamentoFornecedor) {
        this.editar.emit(p);
    }
    onAdd() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}

