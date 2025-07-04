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
    }

    onSubmit(): void {
        if (this.rfidForm.valid) {
            const rfid = this.rfidForm.value.rfid;
            this.cliente = null; // Reseta os dados do cliente
            this.erro = ''; // Reseta a mensagem de erro

            this.clienteService.listByRfid(rfid).subscribe(
                cliente => {
                    if (cliente) {
                        this.cliente = cliente; // Sempre retorna o cliente desse rfid
                        if (cliente.ativo && cliente.saldo > 0) {
                            this.erro = 'Login realizado com sucesso!';
                            setTimeout(() => {
                                this.erro = '';
                                this.irParaVenda(cliente);
                            }, 3000);
                        } else if (cliente.saldo > 0) {
                            // Chama entradaSaida, mas agora espera um boolean
                            this.clienteService.entradaSaida(cliente.codigoRFID).subscribe(
                                sucesso => {
                                    if (sucesso) {
                                        // Atualiza cliente após sucesso
                                        this.clienteService.listByRfid(rfid).subscribe(clienteAtualizado => {
                                            this.cliente = clienteAtualizado;
                                            this.erro = 'Login realizado com sucesso!';
                                            setTimeout(() => {
                                                this.erro = '';
                                                this.cliente = null
                                            }, 2500);
                                            this.rfidForm.reset();
                                        });
                                    } else {
                                        this.erro = 'Erro ao registrar entrada/saída do cliente.';
                                    }
                                },
                                error => {
                                    this.erro = 'Erro ao registrar entrada/saída do cliente.';
                                }
                            );
                        } else {
                            // Não atualiza 'ativo', mas mantém cliente retornado

                            this.rfidForm.reset();
                        }
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


    irParaVenda(element: Cliente): void {
        if (element && element._id) {
            // Navega diretamente para a tela de venda com o ID do cliente
            this.router.navigate(['/venda', element._id]).catch(err => {
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

    irParaSair(): void {
        // Navega para a página inicial
        this.router.navigate(['/logout']).catch(err => {
            this.erro = 'Erro ao ir para a página de saida. Tente novamente.';
        });
    }

    onRecharge() {
        if (this.cliente && this.cliente._id) {
            this.router.navigate(['/recarga', this.cliente._id]);
        } else {
            console.error('Cliente _id is undefined');
        }
    }
}

