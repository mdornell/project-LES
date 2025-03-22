import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../types/usuario';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        UsuariosListComponent,
        CommonModule
    ],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

    usuarios$: Observable<Usuario[]>;
    usuarioSelected: Usuario | null = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService
    ) {
        this.usuarios$ = this.usuarioService.list();
    }

    ngOnInit() {
    }

    onUsuarioSelected(usuario: Usuario) {
        this.usuarioSelected = usuario;
    }

    onDelete() {
        if (this.usuarioSelected?._id) {
            this.usuarioService.remove(this.usuarioSelected).
                subscribe(() => {
                    this.usuarios$ = this.usuarioService.list();
                });
        }
        this.usuarioSelected = null;
    }
}
