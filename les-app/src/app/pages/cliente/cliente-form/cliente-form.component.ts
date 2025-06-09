import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
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
        private clienteService: ClienteService,
        // private router: Router, // Removed as it is unused
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
        this.form = this.fb.group({
            _id: [0],
            nome: [''],
            email: [''],
            saldo: [0],
            codigoRFID: [''],
            dataAniversario: ['yyyy-mm-dd'],
            ativo: [false]
        });
    }

    ngOnInit(): void {
        const cliente: Cliente = this.route.snapshot.data['cliente']; // Ensure cliente is initialized
        this.form.setValue({
            _id: cliente._id,
            nome: cliente.nome,
            email: cliente.email,
            saldo: cliente.saldo,
            codigoRFID: cliente.codigoRFID,
            dataAniversario: cliente.dataAniversario || 'yyyy-mm-dd',
            ativo: cliente.ativo || false
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const formValue = { ...this.form.value };
            const dataAniversario = new Date(formValue.dataAniversario);
            dataAniversario.setDate(dataAniversario.getDate() + 1);
            formValue.dataAniversario = dataAniversario.toISOString().split('T')[0]; // Format as yyyy-mm-dd

            console.log(formValue);
            this.clienteService.save(formValue)
                .subscribe({
                    next: () => this.onSuccess(),
                    error: () => this.onErro()
                }); // Updated to use observer object
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
