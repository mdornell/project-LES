import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

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
    usuario: any = null;
    erro: string = '';

    constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
        this.rfidForm = this.fb.group({
            rfid: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.rfidForm.valid) {
            const rfid = this.rfidForm.value.rfid;
            this.usuario = null; // Reseta os dados do usuário
            this.erro = ''; // Reseta a mensagem de erro

            this.usuarioService.listByRfid(rfid).subscribe(
                usuario => {
                    this.usuario = usuario;
                },
                error => {
                    this.erro = 'Usuário não encontrado ou erro ao buscar.';
                }
            );
        }
    }
}
