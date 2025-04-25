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
}
