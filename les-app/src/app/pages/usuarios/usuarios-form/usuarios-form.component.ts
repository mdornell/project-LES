import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../types/usuario';


@Component({
    selector: 'app-usuarios-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './usuarios-form.component.html',
    styleUrl: './usuarios-form.component.scss'
})
export class UsuariosFormComponent implements OnInit {

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
            cargo: [''],
            codigoRFID: [''],
        });
    }

    ngOnInit(): void {
        const usuario: Usuario = this.route.snapshot.data['usuario'];
        this.form.setValue({
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            senha: '',
            cargo: usuario.cargo,
            codigoRFID: usuario.codigoRFID,
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
