import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../types/cliente';
import { ClienteListComponent } from './cliente-list/cliente-list.component';



@Component({
    selector: 'app-cliente',
    standalone: true,
    imports: [
        ClienteListComponent,
        CommonModule
    ],
    templateUrl: './cliente.component.html',
    styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

    clientes$: Observable<Cliente[]>;
    clienteSelected: Cliente | null = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clienteService: ClienteService
    ) {
        this.clientes$ = this.clienteService.list();
    }

    ngOnInit() {
    }

    onClienteSelected(cliente: Cliente) {
        this.clienteSelected = cliente;
    }

    onDelete() {
        if (this.clienteSelected?._id) {
            this.clienteService.remove(this.clienteSelected).
                subscribe(() => {
                    this.clientes$ = this.clienteService.list();
                });
        }
        this.clienteSelected = null;
    }
}
