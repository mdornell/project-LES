import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        RouterLink
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    isSubmenuVisible: boolean = false;

    telas: {
        nomeTela: string;
        rota: string;
    }[] = [];

    constructor(
        private usuarioService: UsuarioService
    ) {
    }

    ngOnInit() {
        this.listarTelas();
    }

    logout(): void {
        console.log('User logged out');
        localStorage.removeItem('authToken'); // Clear the token
        // Navigate to the login page or root route
        window.location.href = '';
    }


    toggleSubmenu($event: Event): void {
        $event.preventDefault(); // Prevent default link behavior
        this.isSubmenuVisible = !this.isSubmenuVisible;
    }

    closeSubmenu(): void {
        this.isSubmenuVisible = false;
    }

    listarTelas() {
        this.usuarioService.listTelas().subscribe(telas => {
            this.telas = telas.map(tela => ({
                nomeTela: tela.nome,
                rota: tela.rota
            }));
        });
    }

}
