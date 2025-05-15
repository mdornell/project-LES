import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cliente } from '../../../types/cliente';

@Component({
    selector: 'app-aniversariantes-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './aniversariantes-list.component.html',
    styleUrl: './aniversariantes-list.component.scss'
})
export class AniversariantesListComponent {
    @Input() aniversariantes: Cliente[] = [];
}
