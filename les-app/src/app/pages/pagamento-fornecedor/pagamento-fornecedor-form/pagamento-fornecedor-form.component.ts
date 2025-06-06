import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../../services/fornecedor.service';
import { PagamentoFornecedorService } from '../../../services/pagamento-fornecedor.service';
import { PagamentoFornecedor } from '../../../types/pagamento-Fornecedor';

@Component({
    selector: 'app-pagamento-fornecedor-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './pagamento-fornecedor-form.component.html',
    styleUrl: './pagamento-fornecedor-form.component.scss'
})
export class PagamentoFornecedorFormComponent implements OnInit {
    form: FormGroup;
    fornecedores: any[] = [];

    constructor(
        private fb: FormBuilder,
        private pagamentoService: PagamentoFornecedorService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private fornecedorService: FornecedorService,
        private location: Location
    ) {
        this.form = this.fb.group({
            _id: [0],
            descricao: [''],
            dataVencimento: [''],
            dataPagamento: [''],
            metodo: [''],
            valorPago: [0],
            fornecedor: [null], // alterado para fornecedorId
        });
    }

    // Método para abrir modal de fornecedores usando Bootstrap
    abrirModalFornecedores() {
        const modalElement = document.getElementById('modalFornecedores');
        if (modalElement) {
            // @ts-ignore
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
        } else {
            this.snackBar.open('Modal de fornecedores não encontrado', '', { duration: 3000 });
        }
    }

    // Método para selecionar fornecedor (recebe o fornecedor selecionado)
    selecionarFornecedor(fornecedor: any) {
        this.form.patchValue({ fornecedor: fornecedor._id });
        this.fornecedorSelecionado = fornecedor;
        // Fechar o modal após selecionar
        const modalElement = document.getElementById('modalFornecedores');
        if (modalElement) {
            // @ts-ignore
            const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
    }

    ngOnInit() {
        const pagamento: PagamentoFornecedor = this.route.snapshot.data['pagamento'];
        if (pagamento) {
            // Ajuste para preencher fornecedorId
            this.form.patchValue({
                ...pagamento,
                fornecedorId: pagamento.fornecedor?._id || pagamento.fornecedor || null
            });
        }
        // Carregar fornecedores
        this.loadFornecedores();
    }

    loadFornecedores() {
        this.fornecedorService.list().subscribe((data: any[]) => {
            this.fornecedores = data;
        });
    }

    getFornecedorSelecionadoId() {
        return this.form.get('fornecedor')?.value || null;
    }

    onSubmit() {
        if (this.form.valid) {
            const formValue = { ...this.form.value };

            // Ajuste de data para formato yyyy-MM-dd
            if (formValue.dataPagamento) {
                const dataPagamento = new Date(formValue.dataPagamento);
                formValue.dataPagamento = dataPagamento.toISOString().split('T')[0];
            }
            if (formValue.dataVencimento) {
                const dataVencimento = new Date(formValue.dataVencimento);
                formValue.dataVencimento = dataVencimento.toISOString().split('T')[0];
            }

            // Monta o objeto conforme o JSON desejado
            const payload = {
                descricao: formValue.descricao,
                dataVencimento: formValue.dataVencimento,
                dataPagamento: formValue.dataPagamento,
                metodo: formValue.metodo,
                valorPago: formValue.valorPago,
            };

            const fornecedorId = this.getFornecedorSelecionadoId();


            this.pagamentoService.save(payload, fornecedorId)
                .subscribe({
                    next: () => this.onSuccess(),
                    error: () => this.onErro()
                });
        } else {
            this.snackBar.open('Formulario Invalido', 'X', { duration: 5000 });
        }
    }

    // Adicione esta propriedade para armazenar o fornecedor selecionado
    fornecedorSelecionado: any = null;

    // Atualize o fornecedorSelecionado ao mudar o select
    onFornecedorChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.fornecedorSelecionado = this.fornecedores.find(f => f._id == value);
    }

    onCancel() {
        this.form.reset();
        this.location.back();
    }

    onSuccess() {
        this.snackBar.open('Registro salvo com sucesso', '', { duration: 5000 });
        this.location.back();
    }

    onErro() {
        this.snackBar.open('Erro ao salvar o registro', '', { duration: 5000 });
    }


}
