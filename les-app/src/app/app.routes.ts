import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { RefeicaoComponent } from './pages/refeicao/refeicao.component';
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
            // Home
            { path: '', component: WelcomeComponent },

            // Funcinarios
            { path: 'funcionario', component: UsuariosComponent },
            { path: 'funcionario/new', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },
            { path: 'funcionario/edit/:id', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },

            // Clientes
            { path: 'cliente', component: ClienteComponent },
            { path: 'cliente/new', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },
            { path: 'cliente/edit/:id', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },

            // Produtos
            { path: 'produto', component: ProdutoComponent },
            { path: 'produto/new', component: ProdutoFormComponent },
            { path: 'produto/edit/:id', component: ProdutoFormComponent },

            // Refeições
            { path: 'refeicao', component: RefeicaoComponent }

        ]
    },

    {
        path: 'cliente',
        component: LoginClienteComponent
    },




];
