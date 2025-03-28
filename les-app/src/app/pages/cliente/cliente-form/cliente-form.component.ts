import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Cliente } from '../../../types/cliente';

@Component({
    selector: 'app-cliente-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './cliente-form.component.html',
    styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
        this.form = this.fb.group({
            _id: [0],
            nome: [''],
            email: [''],
            senha: [''],
            codigoRFID: [''],
        });
    }

    ngOnInit(): void {
        const cliente: Cliente = this.route.snapshot.data['usuario'];
        this.form.setValue({
            _id: cliente._id,
            nome: cliente.nome,
            email: cliente.email,
            senha: '',
            codigoRFID: cliente.codigoRFID,
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.usuarioService.save(this.form.value)
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
        this.snackBar.open('Registro salvo com sucesso', '', { duration: 5000 });
        this.location.back();
    }

    onErro() {
        this.snackBar.open('Erro ao salvar o registro', '', { duration: 5000 });
    }
}
