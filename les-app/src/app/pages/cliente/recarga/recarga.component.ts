import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../types/cliente';

@Component({
    selector: 'app-recarga',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './recarga.component.html',
    styleUrl: './recarga.component.scss'
})
export class RecargaComponent {

    cliente!: Cliente;
    erro: string | undefined;

    mostrarOpcoesPagamento: boolean = false;

    constructor(
        private clienteService: ClienteService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const clienteId = params.get('id');
            if (clienteId) {
                this.clienteService.listById(Number(clienteId)).subscribe({
                    next: (cliente: Cliente) => {
                        this.cliente = cliente;
                    },
                    error: () => {
                        this.erro = 'Erro ao buscar cliente.';
                    }
                });
            } else {
                this.erro = 'ID do cliente não fornecido.';
            }
        });
    }

    pagarSaldo(tipoPagamento: 'pix' | 'cartao' | 'dinheiro') {
        console.log(`Pagamento (${tipoPagamento}) iniciado para`, this.cliente.nome);
        var valorRecarga;
        if (this.cliente.saldo < 200) {
            valorRecarga = 200 - this.cliente.saldo;
        } else {
            this.erro = 'Saldo já é igual ou superior a R$200,00.';
            return;
        }

        const dtoPagamento = {
            clienteId: this.cliente._id,
            valor: valorRecarga,
        }

        this.clienteService.registrarRecarga(dtoPagamento).subscribe({
            next: () => {
                console.log(`Saldo recarregado com sucesso para ${this.cliente.nome} via ${tipoPagamento}`);
                this.mostrarOpcoesPagamento = false;
                window.location.reload();
            },
            error: (error) => {
                console.error('Erro ao recarregar saldo:', error);
                this.erro = 'Erro ao recarregar saldo.';
            }
        });
    }

    bloquearCartao() {
        console.log('Cartão bloqueado para', this.cliente.nome);
        // lógica para bloqueio
    }
}
