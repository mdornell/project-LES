import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../../../types/fornecedor';

@Component({
    selector: 'app-fornecedor-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './fornecedor-list.component.html',
    styleUrl: './fornecedor-list.component.scss'
})
export class FornecedorListComponent {

    @Input() fornecedores: Fornecedor[] = [];
    @Output() fornecedorSelected: EventEmitter<Fornecedor> = new EventEmitter<Fornecedor>();

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onAdd() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onEdit(fornecedor: Fornecedor) {
        this.router.navigate(['edit', fornecedor._id], { relativeTo: this.route });
    }

    onSelected(fornecedor: Fornecedor) {
        this.fornecedorSelected.emit(fornecedor);
    }
}
