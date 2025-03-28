import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../types/usuario';

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

    @Input() usuarios: Usuario[] = []
    @Output() usuarioSelected: EventEmitter<Usuario> = new EventEmitter<Usuario>();

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onAdd() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onEdit(usuario: Usuario) {
        this.router.navigate(['edit', usuario._id], { relativeTo: this.route });
    }

    onSelected(usuario: Usuario) {
        this.usuarioSelected.emit(usuario);
    }
}
