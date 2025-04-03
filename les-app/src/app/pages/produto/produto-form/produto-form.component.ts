import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../types/produto';


@Component({
    selector: 'app-produto-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './produto-form.component.html',
    styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private produtoService: ProdutoService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
        this.form = this.fb.group({
            _id: [0],
            nome: [''],
            descricao: [''],
            preco: [0],
            quantidade: [0],
            codigoBarras: [''],
            ativo: [false]
        });
    }

    ngOnInit(): void {
        const produto: Produto = this.route.snapshot.data['produto'];
        this.form.setValue({
            _id: produto._id,
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            quantidade: produto.quantidade,
            codigoBarras: produto.codigoBarras,
            ativo: produto.ativo || false
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.produtoService.save(this.form.value)
                .subscribe(
                    result => this.onSuccess(),
                    error => this.onErro()
                );
        } else {
            this.snackBar.open('Formulario Invalido', 'X', { duration: 5000 });
        }
    }

    onCancel() {
        this.form.reset();
        this.location.back();
    }

    onSuccess() {
        this.snackBar.open('Produto salvo com sucesso', '', { duration: 5000 });
        this.location.back();
    }

    onErro() {
        this.snackBar.open('Erro ao salvar o produto', '', { duration: 5000 });
    }
}
