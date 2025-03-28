import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';

interface SignupForm {
    name: FormControl,
    email: FormControl,
    password: FormControl,
    passwordConfirm: FormControl
}

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        DefaultLoginLayoutComponent,
        ReactiveFormsModule,
        PrimaryInputComponent
    ],
    providers: [
        LoginService
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignUpComponent {
    signupForm!: FormGroup<SignupForm>;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private toastService: ToastrService
    ) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

    submit() {
        this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe({
            next: (response) => {
                const token = response.token; // Supondo que o token está na propriedade 'token' da resposta
                localStorage.setItem('auth-token', token); // Armazena o token no localStorage
                this.toastService.success("Login feito com sucesso!");
                this.router.navigate(["/home"]); // Redirecionamento após login
            },
            error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
        })
    }

    navigate() {
        this.router.navigate(["login"])
    }
}
