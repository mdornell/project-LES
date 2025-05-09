import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { VendaService } from '../../services/venda.service';
import { Cliente } from '../../types/cliente';
import { Produto } from '../../types/produto';
import { Venda } from '../../types/venda';

@Component({
    selector: 'app-venda',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './venda.component.html',
    styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
    venda!: Venda;
    cliente!: Cliente;
    codigoBarras: string = ''; // Starts as an empty string
    valorGasto: number = 0;
    saldoAnterior: number = 0;
    erro: string = '';
    produtos: Produto[] = [];
    dataHora: Date = new Date();

    constructor(
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private produtoService: ProdutoService,
        private vendaService: VendaService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const clienteId = params.get('id');
            if (clienteId) {
                this.clienteService.listById(Number(clienteId)).subscribe({
                    next: (cliente: Cliente) => {
                        this.cliente = cliente;
                        this.saldoAnterior = cliente.saldo;
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

    inserirProduto(): void {
        if (!this.codigoBarras.trim()) {
            this.snackBar.open('Código de barras não pode estar vazio.', '', {
                duration: 3000,
            });
            return;
        }

        this.produtoService.listByCodigo(Number(this.codigoBarras)).subscribe({
            next: (produto) => {
                if (produto) {
                    this.produtos.push(produto);
                    this.valorGasto = this.produtos.reduce((acc, prod) => acc + prod.preco, 0);
                    this.saldoAnterior = this.cliente.saldo - this.valorGasto;
                } else {
                    this.snackBar.open('Produto não encontrado.', '', {
                        duration: 3000,
                    });
                }
            },
            error: () => {
                this.snackBar.open('Erro ao buscar produto.', '', {
                    duration: 3000,
                });
            }
        });

        this.codigoBarras = ''; // Clear the input field
    }

    finalizarCompra(): void {
        if (this.saldoAnterior < 0) {
            this.snackBar.open('Compra não realizada, saldo insuficiente.', '', {
                duration: 5000,
            });
            return;
        }

        const itensVenda = this.produtos.map(produto => ({
            _id: 0,
            produtoId: produto._id,
            quantidade: 1,
            preco: produto.preco,
            custo: produto.preco
        }));

        const novaVenda: Venda = {
            cliente: this.cliente,
            dataHora: this.dataHora,
            itens: itensVenda,
            valorTotal: this.valorGasto,
            descricaoVenda: ''
        };

        this.vendaService.save(novaVenda).subscribe({
            next: () => {
                this.snackBar.open('Compra finalizada com sucesso.', '', {
                    duration: 5000,
                });
                this.resetForm();
            },
            error: () => {
                this.snackBar.open('Compra não realizada, erro ao salvar venda.', '', {
                    duration: 5000,
                });
            }
        });
    }

    private resetForm(): void {
        this.produtos = [];
        this.valorGasto = 0;
        this.saldoAnterior = this.cliente.saldo;
        this.codigoBarras = '';
        this.erro = '';
    }
}
