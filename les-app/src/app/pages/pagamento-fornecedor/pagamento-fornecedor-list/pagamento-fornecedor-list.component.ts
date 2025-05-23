import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    onSelect(p: PagamentoFornecedor) {
        this.selecionar.emit(p);
    }

    onEdit(p: PagamentoFornecedor) {
        this.editar.emit(p);
    }
}
