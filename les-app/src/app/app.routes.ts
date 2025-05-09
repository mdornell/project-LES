import { Routes } from '@angular/router';
import { AniversariantesComponent } from './pages/aniversariantes/aniversariantes.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClientesDiariosComponent } from './pages/clientes-diarios/clientes-diarios.component';
import { DreDiarioComponent } from './pages/dre-diario/dre-diario.component';
import { FornecedorFormComponent } from './pages/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { RefeicaoComponent } from './pages/refeicao/refeicao.component';
import { ProdutosComponent } from './pages/relatorios/produtos/produtos.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VendaComponent } from './pages/venda/venda.component';
import { ClienteResolver } from './services/guard/cliente.resolver';
import { FornecedorResolver } from './services/guard/fornecedor.resolver';
import { ProdutoResolver } from './services/guard/produto.resolver';
import { UsuarioResolver } from './services/guard/usuario.resolver';


export const routes: Routes = [

    { path: "", component: LoginComponent },
    { path: "signup", component: SignUpComponent },

    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        children: [
            // Home
            { path: 'funcionario', component: UsuariosComponent },
            { path: 'funcionario/new', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },
            { path: 'funcionario/edit/:id', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },

            // Clientes
            { path: 'cliente', component: ClienteComponent },
            { path: 'cliente/new', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },
            { path: 'cliente/edit/:id', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },

            // Produtos
            { path: 'produto', component: ProdutoComponent },
            { path: 'produto/new', component: ProdutoFormComponent, resolve: { produto: ProdutoResolver } },
            { path: 'produto/edit/:id', component: ProdutoFormComponent, resolve: { produto: ProdutoResolver } },

            // Refeições
            { path: 'refeicao', component: RefeicaoComponent },

            // Fornecedores
            { path: 'fornecedor', component: FornecedorComponent, },
            { path: 'fornecedor/new', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver } },
            { path: 'fornecedor/edit/:id', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver } },

            //Vendas
            { path: 'venda/:id', component: VendaComponent },

            // Aniversariantes
            {
                path: 'aniversariantes',
                component: AniversariantesComponent
            },

            //DRE Diário
            {
                path: 'dre-diario',
                component: DreDiarioComponent
            },

            // Clientes Diários
            {
                path: 'clientes-diarios',
                component: ClientesDiariosComponent
            },

            // Relatórios
            { path: 'relatorio-produto', component: ProdutosComponent },
        ]
    },

    {
        path: 'cliente',
        component: LoginClienteComponent
    },



];
