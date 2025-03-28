import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../types/cliente';

@Component({
    selector: 'app-cliente-list',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './cliente-list.component.html',
    styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent {

    @Input() clientes: Cliente[] = []
    @Output() clienteSelected: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onAdd() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onEdit(cliente: Cliente) {
        this.router.navigate(['edit', cliente._id], { relativeTo: this.route });
    }

    onSelected(cliente: Cliente) {
        this.clienteSelected.emit(cliente);
    }
}
