import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

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

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.rfidForm.valid) {
            const rfid = this.rfidForm.value.rfid;
            this.cliente = null; // Reseta os dados do cliente
            this.erro = ''; // Reseta a mensagem de erro

            this.clienteService.listByRfid(rfid).subscribe(
                cliente => {
                    this.cliente = cliente;
                    this.carregarClientesDia();
                },
                error => {
                    this.erro = 'Cliente não encontrado ou erro ao buscar.';
                }
            );
        }
    }

    carregarClientesDia(): void {
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

    irParaVenda(): void {
        if (this.cliente && this.cliente._id) {
            // Navega diretamente para a tela de venda com o ID do cliente a partir da rota 'home'
            this.router.navigate(['/home', 'venda', this.cliente._id]).catch(err => {
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


}
