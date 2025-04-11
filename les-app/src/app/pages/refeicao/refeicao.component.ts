import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RefeicaoService } from '../../services/refeicao.service';
import { Refeicao } from '../../types/refeição';
import { RefeicaoListComponent } from './refeicao-list/refeicao-list.component';

@Component({
    selector: 'app-refeicao',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RefeicaoListComponent
    ],
    templateUrl: './refeicao.component.html',
    styleUrl: './refeicao.component.scss'
})
export class RefeicaoComponent {

    refeicoes$: Observable<Refeicao[]>;
    refeicaoSelected: Refeicao | null = null;

    form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private refeicaoService: RefeicaoService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private location: Location
    ) {
        this.refeicoes$ = this.refeicaoService.list();

        this.form = this.fb.group({
            _id: [0],
            precoKg: [''],
            dataRegistro: [''],
        });
    }

    ngOnInit() {
        // const refeicao: Refeicao = this.route.snapshot.data['refeicao'];
        // this.form.setValue({
        //     _id: refeicao._id,
        //     precoKg: refeicao.precoKg,
        //     data: refeicao.data,
        // });
    }

    onRefeicaoSelected(Refeicao: Refeicao) {
        this.refeicaoSelected = Refeicao;
    }

    onDelete() {
        if (this.refeicaoSelected?._id) {
            this.refeicaoService.remove(this.refeicaoSelected).
                subscribe(() => {
                    this.refeicoes$ = this.refeicaoService.list();
                });
        }
        this.refeicaoSelected = null;
    }




    onSubmit() {
        if (this.form.valid) {
            this.form.patchValue({ dataRegistro: new Date().toISOString() });
            this.refeicaoService.save(this.form.value)
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
        this.form.reset();
        this.refeicaoSelected = null;
        this.refeicoes$ = this.refeicaoService.list();
        // this.location.back();
    }

    onErro() {
        this.snackBar.open('Erro ao salvar o registro', '', { duration: 5000 });
    }

}
