import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../types/cliente';
import { DateConverter } from '../../util/DateConverter';
import { AniversariantesListComponent } from './aniversariantes-list/aniversariantes-list.component';

@Component({
    selector: 'app-aniversariantes',
    standalone: true,
    imports: [
        AniversariantesListComponent,
        CommonModule,
        FormsModule
    ],
    templateUrl: './aniversariantes.component.html',
    styleUrl: './aniversariantes.component.scss'
})
export class AniversariantesComponent {

    aniversariantes$!: Observable<Cliente[]>;

    // Filtros
    dataFiltro: string = new Date().toISOString().substring(0, 10);

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.aplicarFiltro(); // já aplica o filtro padrão
    }

    aplicarFiltro(): void {
        const [, mes, dia] = this.dataFiltro.split('-').map(Number); // ignora o ano
        this.aniversariantes$ = this.clienteService.list().pipe(
            map((clientes: Cliente[]) => clientes.filter(cliente => {
                const data = DateConverter.fromSpringDate(cliente.dataAniversario);
                return (
                    data.getDate() === dia - 1 &&
                    data.getMonth() + 1 === mes
                );
            }))
        );
    }
}