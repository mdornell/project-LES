import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../types/produto';
import { ProdutoListComponent } from './produto-list/produto-list.component';

@Component({
    selector: 'app-produto',
    standalone: true,
    imports: [
        ProdutoListComponent,
        CommonModule
    ],
    templateUrl: './produto.component.html',
    styleUrl: './produto.component.scss'
})
export class ProdutoComponent {

    produtos$: Observable<Produto[]>;
    produtoSelected: Produto | null = null;

    constructor(
        private produtoService: ProdutoService,
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
}
