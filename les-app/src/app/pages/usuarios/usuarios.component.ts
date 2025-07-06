import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable } from 'rxjs';
import { PermissaoService } from '../../services/permissoes.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../types/usuario';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        UsuariosListComponent,
        CommonModule,
        RouterModule
    ],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

    usuarios$: Observable<Usuario[]>;
    usuarioSelected: Usuario | null = null;

    constructor(
        private usuarioService: UsuarioService,
        private permissionService: PermissaoService,
        private snackBar: MatSnackBar
    ) {
        this.usuarios$ = this.usuarioService.list();
    }

    telasPermissoes: {
        nomeTela: string;
        podeVer: boolean;
        podeAdicionar: boolean;
        podeEditar: boolean;
        podeExcluir: boolean;
    }[] = [];

    ngOnInit() {
    }

    onUsuarioSelected(usuario: Usuario) {
        this.usuarioSelected = usuario;
    }

    onDelete() {
        if (this.usuarioSelected?._id) {
            this.usuarioService.remove(this.usuarioSelected).
                subscribe(() => {
                    this.usuarios$ = this.usuarioService.list();
                });
        }
        this.usuarioSelected = null;
    }

    onRelatorio(): void {
        // Seleciona a tabela de funcionários pelo seletor apropriado
        const table = document.querySelector('table');
        if (!table) {
            alert('Tabela de funcionários não encontrada!');
            return;
        }


        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("Relatório de Funcionários", 105, 15, { align: "center" });


        autoTable(doc, { html: table, startY: 25 });

        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    }


    onPermissoesSuccess() {
        this.snackBar.open('Permissões salvas com sucesso', '', { duration: 5000 });
    }

    onPermissoesErro() {
        this.snackBar.open('Erro ao salvar permissões', '', { duration: 5000 });
    }

    // Carrega permissões dinamicamente do backend ou lista todas as telas se não houver permissões
    listarTelas() {
        this.usuarioService.listTelas().subscribe(telas => {
            this.telasPermissoes = telas.map(tela => ({
                nomeTela: tela.nome,
                podeVer: false,
                podeAdicionar: false,
                podeEditar: false,
                podeExcluir: false
            }));
        });
    }

    // Salva permissões dinamicamente
    salvarPermissoes(): void {
        if (!this.usuarioSelected?._id) {
            this.snackBar.open('Selecione um funcionário para salvar permissões.', 'X', { duration: 5000 });
            return;
        }

        const permissoesJSON = this.telasPermissoes.map((tela) => ({
            nomeTela: tela.nomeTela,
            podeVer: tela.podeVer,
            podeAdicionar: tela.podeAdicionar,
            podeEditar: tela.podeEditar,
            podeExcluir: tela.podeExcluir
        }));

        this.permissionService.salvarPermissoes(this.usuarioSelected._id, permissoesJSON)
            .subscribe({
                next: () => this.onPermissoesSuccess(),
                error: () => this.onPermissoesErro()
            });
    }
}