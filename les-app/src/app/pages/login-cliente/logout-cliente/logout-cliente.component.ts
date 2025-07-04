import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../types/cliente';

@Component({
    selector: 'app-logout-cliente',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './logout-cliente.component.html',
    styleUrl: './logout-cliente.component.scss'
})
export class LogoutClienteComponent {
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

            const inicio = Date.now();

            this.clienteService.listByRfid(rfid).subscribe(
                cliente => {
                    if (cliente) {
                        this.cliente = cliente; // Sempre retorna o cliente desse rfid
                        // Chama entradaSaida sempre, não vai para venda
                        this.clienteService.entradaSaida(rfid).subscribe(
                            sucesso => {
                                const tempo = Date.now() - inicio;
                                if (sucesso) {
                                    // Atualiza cliente após sucesso
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000);
                                } else {
                                    this.erro = 'Erro ao registrar entrada/saída do cliente.';
                                }
                            },
                            error => {
                                this.erro = 'Erro ao registrar entrada/saída do cliente.';
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
    irParaEntrar() {
        // Navega para a página de entrada
        this.router.navigate(['/login']).catch(err => {
            this.erro = 'Erro ao ir para a página de entrada. Tente novamente.';
        });
    }



}
