import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
        this.refeicoes$ = this.refeicaoService.list().pipe(
            map(refeicoes => refeicoes.sort((a, b) => (Number(b._id) ?? 0) - (Number(a._id) ?? 0)))
        );

        this.form = this.fb.group({
            _id: [0],
            precoKg: [''],
            dataRegistro: [''],
        });
    }

    ngOnInit() {
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
        this.refeicoes$ = this.refeicaoService.list().pipe(
            map(refeicoes => refeicoes.sort((a, b) => (Number(b._id) ?? 0) - (Number(a._id) ?? 0)))
        );
        // this.location.back();
    }

    onErro() {
        this.snackBar.open('Erro ao salvar o registro', '', { duration: 5000 });
    }

    onRelatorio(): void {
        // Seleciona a tabela de refeições pelo id ou classe no HTML
        const table = document.querySelector('table');
        if (!table) {
            this.snackBar.open('Tabela de refeições não encontrada!', 'X', { duration: 5000 });
            return;
        }

        // @ts-ignore
        const doc = new window.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Refeições", 105, 15, { align: "center" });

        // @ts-ignore
        window.autoTable(doc, { html: table, startY: 25 });

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }

}
