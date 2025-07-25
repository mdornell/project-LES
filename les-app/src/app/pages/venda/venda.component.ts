import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { RefeicaoService } from '../../services/refeicao.service';
import { VendaService } from '../../services/venda.service';
import { Cliente } from '../../types/cliente';
import { Produto } from '../../types/produto';
import { Refeicao } from '../../types/refeição';
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
    codigoBarras: number | null = null; // Starts as null
    valorGasto: number = 0;
    saldoAnterior: number = 0;
    erro: string = '';
    produtos: Produto[] = [];
    dataHora: Date = new Date();
    pesoRefeicao: number | null = null;
    refeicao: number = 0;
    valorRefeicao: number = 0;

    constructor(
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private produtoService: ProdutoService,
        private vendaService: VendaService,
        private refeicaoService: RefeicaoService,
        private snackBar: MatSnackBar,
        private router: Router,
    ) { }

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

        this.listarRefeicaoMaisRecente();
    }

    inserirProduto(): void {
        if (!this.codigoBarras) {
            this.snackBar.open('Código de barras não pode estar vazio.', '', {
                duration: 3000,
            });
            return;
        }

        this.produtoService.listByCodigo(this.codigoBarras).subscribe({
            next: (produto) => {
                if (produto) {
                    console.log
                    this.produtos.push(produto);
                    this.valorGasto = this.produtos.reduce((acc, prod) => acc + prod.valorVenda, 0);
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

        this.codigoBarras = null; // Clear the input field
    }

    finalizarCompra(): void {
        if (this.saldoAnterior < 0) {
            this.snackBar.open('Compra não realizada, saldo insuficiente.', '', {
                duration: 5000,
            });
            return;
        }

        // Garante que só IDs e dados necessários sejam enviados
        const itensVenda = this.produtos.map(produto => ({
            _id: 0,
            produtoId: produto._id, // Deve ser apenas o ID (string ou número)
            quantidade: 1,
            preco: produto.valorVenda,
            custo: produto.valorCusto,
        }));

        const novaVenda: Partial<Venda> = {
            dataHora: this.dataHora,
            descricaoVenda: '',
            valorTotal: this.valorGasto,
            peso: this.pesoRefeicao || 0,
            cliente_id: this.cliente._id, // Também apenas o ID
            itens: itensVenda
        };

        if (this.valorGasto === 0) {
            this.snackBar.open('Nenhum valor gasto. Retornando.', '', {
                duration: 2000,
            }).afterDismissed().subscribe(() => {
                this.router.navigate(['/login']);
                this.resetForm();
            });
            return;
        }

        this.vendaService.save(novaVenda).subscribe({
            next: () => {
                this.snackBar.open('Compra finalizada com sucesso.', '', {
                    duration: 2000,
                }).afterDismissed().subscribe(() => {
                    this.router.navigate(['/login']);
                    this.resetForm();
                });
            },
            error: (err) => {
                console.error('Erro ao salvar venda:', err);
                this.snackBar.open(
                    `Compra não realizada: ${err?.message || 'erro desconhecido.'}`,
                    '',
                    { duration: 5000 }
                );
            }
        });
    }


    private resetForm(): void {
        this.produtos = [];
        this.valorGasto = 0;
        this.saldoAnterior = this.cliente.saldo;
        this.codigoBarras = null; // Reset the input field
        this.erro = '';
    }

    listarRefeicaoMaisRecente(): void {
        this.refeicaoService.list().subscribe({
            next: (refeicoes: Refeicao[]) => {
                if (refeicoes && refeicoes.length > 0) {
                    // Ordena por data/hora decrescente e pega a mais recente
                    const refeicaoMaisRecente = refeicoes.sort((a, b) =>
                        new Date(b.dataRegistro).getTime() - new Date(a.dataRegistro).getTime()
                    )[0];
                    if (refeicaoMaisRecente.precoKg !== 0) {
                        this.valorRefeicao = refeicaoMaisRecente.precoKg;
                    }
                    if (this.pesoRefeicao !== null && this.pesoRefeicao !== undefined && this.pesoRefeicao !== 0) {
                        this.refeicao = refeicaoMaisRecente.precoKg * this.pesoRefeicao;
                        // Acumula valor gasto com produtos e refeição
                        const valorProdutos = this.produtos.reduce((acc, prod) => acc + prod.valorVenda, 0);
                        this.valorGasto = valorProdutos + this.refeicao;
                        this.saldoAnterior = this.cliente.saldo - this.valorGasto;
                    } else {
                        // Se o campo de peso foi deletado (null, undefined ou 0), restaura valores anteriores
                        this.valorGasto = this.produtos.reduce((acc, prod) => acc + prod.valorVenda, 0);
                        this.saldoAnterior = this.cliente.saldo - this.valorGasto;
                        this.refeicao = 0; // Zera o cálculo da refeição
                    }
                } else {
                    this.snackBar.open('Nenhuma refeição encontrada.', '', { duration: 3000 });
                }
            },
            error: () => {
                this.snackBar.open('Erro ao buscar refeições.', '', { duration: 3000 });
            }
        });
    }

    removerProduto(i: number): void {
        if (i >= 0 && i < this.produtos.length) {
            this.produtos.splice(i, 1);
            this.valorGasto = this.produtos.reduce((acc, prod) => acc + prod.valorVenda, 0);
            this.saldoAnterior = this.cliente.saldo - this.valorGasto;
        }
    }

    onRelatorio(): void {
        if (!this.cliente || this.produtos.length === 0) {
            this.snackBar.open('Nenhuma venda para gerar cupom.', '', { duration: 3000 });
            return;
        }

        // Cálculo da altura dinâmica do cupom
        const linhasFixas = 7; // Título, cliente, data, "Produtos:", total, saldo, espaçamentos
        const linhasProdutos = this.produtos.length;
        const alturaLinha = 5; // mm por linha
        const alturaMinima = 80; // altura mínima do cupom em mm

        let altura = 10 + (linhasFixas + linhasProdutos) * alturaLinha + 10;
        if (altura < alturaMinima) altura = alturaMinima;

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [80, altura]
        });

        let y = 10;
        doc.setFont("courier", "normal");
        doc.setFontSize(12);
        doc.text("CUPOM FISCAL", 40, y, { align: "center" });

        y += 8;
        doc.setFontSize(9);
        doc.text(`Cliente: ${this.cliente.nome}`, 5, y);
        y += 5;
        doc.text(`Data: ${this.dataHora.toLocaleString()}`, 5, y);
        y += 8;

        doc.text("Produtos:", 5, y);
        y += 5;

        this.produtos.forEach((produto, idx) => {
            doc.text(
                `${idx + 1}. ${produto.nome} - R$ ${produto.valorVenda.toFixed(2)}`,
                7,
                y
            );
            y += 5;
        });

        y += 3;
        doc.text(`Total: R$ ${this.valorGasto.toFixed(2)}`, 5, y);
        y += 5;
        doc.text(`Saldo após compra: R$ ${(this.saldoAnterior).toFixed(2)}`, 5, y);

        // Abre o PDF em nova aba
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }

}
