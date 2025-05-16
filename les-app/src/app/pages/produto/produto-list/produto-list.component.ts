import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../types/produto';


@Component({
    selector: 'app-produto-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './produto-list.component.html',
    styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent {

    @Input() produtos: Produto[] = [];
    @Output() produtoSelected: EventEmitter<Produto> = new EventEmitter<Produto>();

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onAdd() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onEdit(produto: Produto) {
        this.router.navigate(['edit', produto._id], { relativeTo: this.route });
    }

    onSelected(produto: Produto) {
        this.produtoSelected.emit(produto);
    }
}
