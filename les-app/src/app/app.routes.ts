import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [

    { path: "", component: LoginComponent },
    { path: "signup", component: SignUpComponent },
    { path: "user", component: UserComponent },

    { path: 'usuario', component: UsuariosComponent },
    { path: 'usuario/new', component: UsuariosFormComponent },
    { path: 'usuario/edit/{?}', component: UsuariosFormComponent }



];
