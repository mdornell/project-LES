import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'app-login-cliente',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './login-cliente.component.html',
    styleUrl: './login-cliente.component.scss'
})
export class LoginClienteComponent {

    rfidForm: FormGroup;
    cliente: any = null;
    erro: string = '';

    constructor(private fb: FormBuilder, private clienteService: ClienteService) {
        this.rfidForm = this.fb.group({
            rfid: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.rfidForm.valid) {
            const rfid = this.rfidForm.value.rfid;
            this.cliente = null; // Reseta os dados do cliente
            this.erro = ''; // Reseta a mensagem de erro

            this.clienteService.listByRfid(rfid).subscribe(
                cliente => {
                    this.cliente = cliente;
                },
                error => {
                    this.erro = 'Cliente não encontrado ou erro ao buscar.';
                }
            );
        }
    }
}
