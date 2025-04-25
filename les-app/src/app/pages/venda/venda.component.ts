import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    codigoBarras: number = 0;
    valorGasto: number = 0;
    saldoAnterior: number = 0;
    erro: string = '';
    produtos: Produto[] = [];

    dataHora: Date = new Date();

    constructor(
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private produtoService: ProdutoService,
        private vendaService: VendaService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const clienteId = params.get('id');
            console.log(clienteId);
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
        this.produtoService.listByCodigo(this.codigoBarras).subscribe({
            next: (produto) => {
                if (produto) {
                    this.produtos.push(produto); // Add the product to the list of products
                    this.valorGasto = this.produtos.reduce((acc, prod) => acc + prod.preco, 0); // Calculate total cost
                    this.saldoAnterior = this.cliente.saldo - this.valorGasto; // Update remaining balance
                } else {
                    this.erro = 'Produto não encontrado.';
                }
            },
            error: () => {
                this.erro = 'Erro ao buscar produto.';
            }
        });

        this.codigoBarras = 0;
    }

    finalizarCompra(): void {
        const itensVenda = this.produtos.map(produto => ({
            _id: 0, // Assign a default or generated ID as needed
            produtoId: produto._id,
            quantidade: 1, // Assuming quantity is 1 for each product, adjust as needed
            preco: produto.preco,
            custo: produto.preco // Assuming 'custo' is the same as 'preco', adjust as needed
        }));

        console.log(itensVenda)

        const novaVenda: Venda = {
            cliente: this.cliente,
            dataHora: this.dataHora,
            itens: itensVenda,
            valorTotal: this.valorGasto,
            descricaoVenda: ''
        };

        console.log(novaVenda)
        this.vendaService.save(novaVenda).subscribe({
            next: () => {
                console.log('Compra finalizada com sucesso');
                this.produtos = [];
                this.valorGasto = 0;
                this.saldoAnterior = this.cliente.saldo;
            },
            error: () => {
                this.erro = 'Erro ao finalizar a compra.';
            }
        });
    }
}
