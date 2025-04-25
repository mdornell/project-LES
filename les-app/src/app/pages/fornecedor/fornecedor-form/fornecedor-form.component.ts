import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Fornecedor } from '../../../types/fornecedor';


@Component({
    selector: 'app-fornecedor-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './fornecedor-form.component.html',
    styleUrl: './fornecedor-form.component.scss'
})
export class FornecedorFormComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private fornecedorService: FornecedorService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
        this.form = this.fb.group({
            _id: [0],
            nome: [''],
            cnpj: [''],
            endereco: [''],
            telefone: [''],
            email: [''],
        });
    }

    ngOnInit(): void {
        const fornecedor: Fornecedor = this.route.snapshot.data['fornecedor'];
        this.form.setValue({
            _id: fornecedor._id,
            nome: fornecedor.nome,
            cnpj: fornecedor.cnpj,
            endereco: fornecedor.endereco,
            telefone: fornecedor.telefone,
            email: fornecedor.email,
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.fornecedorService.save(this.form.value)
                .subscribe(
                    result => this.onSuccess(),
                    error => this.onErro()
                );
        } else {
            this.snackBar.open('Formulário Inválido', 'X', { duration: 5000 });
        }
    }

    onCancel() {
        this.form.reset();
        this.location.back();
    }

    onSuccess() {
        this.snackBar.open('Fornecedor salvo com sucesso', '', { duration: 5000 });
        this.location.back();
    }

    onErro() {
        this.snackBar.open('Erro ao salvar o fornecedor', '', { duration: 5000 });
    }
}
