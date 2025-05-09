import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../types/cliente';
import { AniversariantesListComponent } from './aniversariantes-list/aniversariantes-list.component';

@Component({
    selector: 'app-aniversariantes',
    standalone: true,
    imports: [
        AniversariantesListComponent,
        CommonModule
    ],
    templateUrl: './aniversariantes.component.html',
    styleUrl: './aniversariantes.component.scss'
})
export class AniversariantesComponent {

    aniversariantes$: Observable<Cliente[]> | undefined;

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        const today = new Date();
        const todayMonth = today.getMonth() + 1; // Months are zero-based
        const todayDate = today.getDate();

        this.aniversariantes$ = this.clienteService.list().pipe(
            map(clientes => clientes.filter(cliente => {
                const clienteDate = new Date(cliente.dataAniversario);
                return clienteDate.getDate() === todayDate && (clienteDate.getMonth() + 1) === todayMonth;
            }))
        );
    }
}
