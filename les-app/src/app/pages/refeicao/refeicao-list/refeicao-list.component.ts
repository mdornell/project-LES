import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Refeicao } from '../../../types/refeição';

@Component({
    selector: 'app-refeicao-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './refeicao-list.component.html',
    styleUrl: './refeicao-list.component.scss'
})
export class RefeicaoListComponent {

    @Input() refeicoes: Refeicao[] = [];
    @Output() refeicaoSelected: EventEmitter<Refeicao> = new EventEmitter<Refeicao>();

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onAdd() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onSelected(refeicao: Refeicao) {
        this.refeicaoSelected.emit(refeicao);
    }
}
