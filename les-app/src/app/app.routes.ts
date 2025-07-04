import { Routes } from '@angular/router';
import { AniversariantesComponent } from './pages/aniversariantes/aniversariantes.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { RecargaComponent } from './pages/cliente/recarga/recarga.component';
import { ClientesDiariosComponent } from './pages/clientes-diarios/clientes-diarios.component';
import { ClientesEmAbertoComponent } from './pages/clientes-em-aberto/clientes-em-aberto.component';
import { ConsumoDiarioComponent } from './pages/consumo-diario/consumo-diario.component';
import { DreDiarioComponent } from './pages/dre-diario/dre-diario.component';
import { FornecedorFormComponent } from './pages/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { HelcomeComponent } from './pages/home/helcome/helcome.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesAtivosComponent } from './pages/login-cliente/clientes-ativos/clientes-ativos.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { LogoutClienteComponent } from './pages/login-cliente/logout-cliente/logout-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { PagamentoFornecedorFormComponent } from './pages/pagamento-fornecedor/pagamento-fornecedor-form/pagamento-fornecedor-form.component';
import { PagamentoFornecedorComponent } from './pages/pagamento-fornecedor/pagamento-fornecedor.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { RefeicaoComponent } from './pages/refeicao/refeicao.component';
import { ProdutosComponent } from './pages/relatorios/produtos/produtos.component';
import { ResumoClienteComponent } from './pages/resumo-cliente/resumo-cliente.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { TicketMedioComponent } from './pages/ticket-medio/ticket-medio.component';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RelatorioVendaComponent } from './pages/venda/relatorio-venda/relatorio-venda.component';
import { VendaComponent } from './pages/venda/venda.component';
import { AuthGuard } from './services/auth-guard.service';
import { ClienteResolver } from './services/guard/cliente.resolver';
import { FornecedorResolver } from './services/guard/fornecedor.resolver';
import { PagamentoFornecedorResolver } from './services/guard/pagamento-fornecedor.resolver';
import { ProdutoResolver } from './services/guard/produto.resolver';
import { UsuarioResolver } from './services/guard/usuario.resolver';


export const routes: Routes = [

    { path: "", component: LoginComponent },
    { path: "signup", component: SignUpComponent },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [

            { path: '', component: HelcomeComponent },

            // Home
            { path: 'funcionario', component: UsuariosComponent },
            { path: 'funcionario/new', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },
            { path: 'funcionario/edit/:id', component: UsuariosFormComponent, resolve: { usuario: UsuarioResolver } },

            // Clientes
            { path: 'cliente', component: ClienteComponent },
            { path: 'cliente/new', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },
            { path: 'cliente/edit/:id', component: ClienteFormComponent, resolve: { cliente: ClienteResolver } },
            { path: 'cliente/recarga/:id', component: RecargaComponent },
            { path: 'cliente/ativos', component: ClientesAtivosComponent },


            // Produtos
            { path: 'produto', component: ProdutoComponent },
            { path: 'produto/new', component: ProdutoFormComponent, resolve: { produto: ProdutoResolver } },
            { path: 'produto/edit/:id', component: ProdutoFormComponent, resolve: { produto: ProdutoResolver } },

            // Refeições
            { path: 'refeicao', component: RefeicaoComponent },

            // Fornecedores
            { path: 'fornecedor', component: FornecedorComponent },
            { path: 'fornecedor/new', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver } },
            { path: 'fornecedor/edit/:id', component: FornecedorFormComponent, resolve: { fornecedor: FornecedorResolver } },

            { path: 'pagamento-fornecedor', component: PagamentoFornecedorComponent, },
            { path: 'pagamento-fornecedor/new', component: PagamentoFornecedorFormComponent, resolve: { fornecedor: PagamentoFornecedorResolver } },
            { path: 'pagamento-fornecedor/edit/:id', component: PagamentoFornecedorFormComponent, resolve: { fornecedor: PagamentoFornecedorResolver } },

            //Vendas

            { path: 'relatorio-venda', component: RelatorioVendaComponent },

            // Aniversariantes
            { path: 'aniversariantes', component: AniversariantesComponent },

            //DRE Diário
            { path: 'dre-diario', component: DreDiarioComponent },

            // Ticket Médio
            { path: 'ticket-medio', component: TicketMedioComponent },

            // Consumo Diário
            { path: 'consumo-diario', component: ConsumoDiarioComponent },

            // Consumo Diário
            { path: 'resumo-cliente', component: ResumoClienteComponent },

            // Clientes Diários
            { path: 'clientes-diarios', component: ClientesDiariosComponent },

            // Relatórios
            { path: 'relatorio-produto', component: ProdutosComponent },

            // Clientes em aberto
            { path: 'clientes-em-aberto', component: ClientesEmAbertoComponent },

            { path: 'venda/:id', component: VendaComponent },
        ]
    },
    { path: 'login', component: LoginClienteComponent },
    { path: 'logout', component: LogoutClienteComponent },
    { path: 'venda/:id', component: VendaComponent },
    { path: 'recarga/:id', component: RecargaComponent },



];
