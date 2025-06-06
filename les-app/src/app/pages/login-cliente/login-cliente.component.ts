import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../types/cliente';

@Component({
    selector: 'app-login-cliente',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './login-cliente.component.html',
    styleUrl: './login-cliente.component.scss'
})
export class LoginClienteComponent {

    rfidForm: FormGroup;
    cliente: any = null;
    clientesEmAberto: any = null;
    erro: string = '';

    listaClientes: any[] = [];

    constructor(
        private fb: FormBuilder,
        private clienteService: ClienteService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.rfidForm = this.fb.group({
            rfid: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.carregarListaClientes();
    }

    onSubmit(): void {
        if (this.rfidForm.valid) {
            const rfid = this.rfidForm.value.rfid;
            this.cliente = null; // Reseta os dados do cliente
            this.erro = ''; // Reseta a mensagem de erro

            this.clienteService.listByRfid(rfid).subscribe(
                cliente => {
                    if (cliente) {
                        // Inverte o valor de 'ativo'
                        cliente.ativo = !cliente.ativo;
                        // Salva o cliente com o novo valor de 'ativo'
                        this.clienteService.save(cliente).subscribe(
                            clienteSalvo => {
                                this.cliente = clienteSalvo;
                                this.carregarClientes();
                                this.carregarListaClientes();
                                // Atualiza o formulário e a tela
                                this.rfidForm.reset();
                            },
                            error => {
                                this.erro = 'Erro ao salvar o cliente.';
                            }
                        );
                    } else {
                        this.erro = 'Cliente não encontrado.';
                    }
                },
                error => {
                    this.erro = 'Cliente não encontrado ou erro ao buscar.';
                }
            );
        }
    }

    carregarClientes(): void {
        this.clienteService.listClientesEmAberto().subscribe(clientes => {
            const clientesFiltrados = clientes.filter((c: any) => c.nome === this.cliente.nome);
            if (clientesFiltrados.length > 0) {
                // Seleciona o cliente com maior valor de "dias"
                this.clientesEmAberto = clientesFiltrados.reduce((prev: any, curr: any) => {
                    return (curr.dias > prev.dias) ? curr : prev;
                });
            } else {
                this.clientesEmAberto = null;
            }
            console.log('Clientes em aberto:', this.clientesEmAberto.dias);
        });
    }

    voltarHome(): void {
        // Navega para a página inicial
        window.location.href = '/home';
    }

    irParaVenda(element: Cliente): void {
        if (element && element._id) {
            // Navega diretamente para a tela de venda com o ID do cliente a partir da rota 'home'
            this.router.navigate(['/home', 'venda', element._id]).catch(err => {
                console.error('Erro ao navegar para a tela de venda:', err);
                this.erro = 'Erro ao navegar para a tela de venda. Tente novamente.';
            });
        } else {
            this.erro = 'Cliente não selecionado ou inválido.';
        }
    }

    voltarParaHome(): void {
        // Navega para a página inicial
        this.router.navigate(['/home']).catch(err => {
            console.error('Erro ao navegar para a página inicial:', err);
            this.erro = 'Erro ao voltar para a página inicial. Tente novamente.';
        });
    }


    carregarListaClientes(): void {
        this.clienteService.list().subscribe(
            (clientes: any[]) => {
                this.listaClientes = clientes.filter(cliente => cliente.ativo);
            },
            error => {
                this.erro = 'Erro ao carregar lista de clientes.';
            }
        );
    }
}
