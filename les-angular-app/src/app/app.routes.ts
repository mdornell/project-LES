import { Routes } from '@angular/router';
import { UsuariosFormComponent } from './shared/pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './shared/pages/usuarios/usuarios.component';
// import { AuthGuard } from './core/guards/auth.guard'; // Guard para proteger as rotas autenticadas

export const routes: Routes = [

    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuarios/new', component: UsuariosFormComponent },
    { path: 'usuarios/edit/:id', component: UsuariosFormComponent },


    // Redirecionamento caso tente acessar uma rota inexistente
    { path: '**', redirectTo: '' }
];
