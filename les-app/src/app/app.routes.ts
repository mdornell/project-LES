import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [

    { path: "", component: LoginComponent },
    { path: "signup", component: SignUpComponent },
    // { path: "user", component: UserComponent, canActivate: [AuthGuard] },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'user', component: UsuariosComponent },
            { path: 'user/new', component: UsuariosFormComponent },
            { path: 'user/edit/:id', component: UsuariosFormComponent }
        ]
    }



];
