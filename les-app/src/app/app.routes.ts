import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './services/auth-guard.service';
import { ClienteResolver } from './services/guard/cliente.resolver';
import { UsuarioResolver } from './services/guard/usuario.resolver';


export const routes: Routes = [

    { path: "", component: LoginComponent },
    { path: "signup", component: SignUpComponent },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent },

            // Funcinarios
            { path: 'user', component: UsuariosComponent },
            { path: 'user/new', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },
            { path: 'user/edit/:id', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },

            // Clientes
            { path: 'cliente', component: ClienteComponent },
            { path: 'cliente/new', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },
            { path: 'cliente/edit/:id', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },


        ]
    },

    {
        path: 'cliente',
        component: LoginClienteComponent
    }



];
