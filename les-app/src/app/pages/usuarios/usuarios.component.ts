import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable } from 'rxjs';
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

    telasPermissoes: {
        nomeTela: string;
        podeVer: boolean;
        podeAdicionar: boolean;
        podeEditar: boolean;
        podeExcluir: boolean;
    }[] = [
            { nomeTela: "Dashboard", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Produto", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Cliente", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Venda", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Fornecedor", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Relatórios", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Recarga", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "PagamentoFornecedor", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Acesso", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false },
            { nomeTela: "Funcionário", podeVer: false, podeAdicionar: false, podeEditar: false, podeExcluir: false }
        ];


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService,
        private snackBar: MatSnackBar
    ) {
        this.usuarios$ = this.usuarioService.list();
    }

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

    salvarPermissoes(): void {
        if (!this.usuarioSelected?._id) {
            this.snackBar.open('Selecione um funcionário para salvar permissões.', 'X', { duration: 5000 });
            return;
        }

        const permissoesJSON = this.telasPermissoes.map((tela, index) => ({
            telaId: index + 1,
            nomeTela: tela.nomeTela,
            podeVer: tela.podeVer,
            podeAdicionar: tela.podeAdicionar,
            podeEditar: tela.podeEditar,
            podeExcluir: tela.podeExcluir
        }));

        this.usuarioService.savePermisions(permissoesJSON, this.usuarioSelected._id)
            .subscribe(
                () => this.onPermissoesSuccess(),
                () => this.onPermissoesErro()
            );
    }

    onPermissoesSuccess() {
        this.snackBar.open('Permissões salvas com sucesso', '', { duration: 5000 });
    }

    onPermissoesErro() {
        this.snackBar.open('Erro ao salvar permissões', '', { duration: 5000 });
    }

}
