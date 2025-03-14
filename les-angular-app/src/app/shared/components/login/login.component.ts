import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioComponent } from '../../pages/Acesso e Controle de Usuarios/usuario/usuario.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        RouterModule,
        UsuarioComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(
        private authService: AuthService // Certifique-se de que AuthService está importado corretamente
    ) { }

    loginActivate() {
        this.authService.login();
        this.authService.isActvated();
    }
}
