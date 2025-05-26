import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        CommonModule
    ],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

    usuarios$: Observable<Usuario[]>;
    usuarioSelected: Usuario | null = null;

    telasPermissoes: string[] = [
        "Dashboard",
        "Produto",
        "Cliente",
        "Venda",
        "Fornecedor",
        "Relatórios",
        "Recarga",
        "PagamentoFornecedor",
        "Acesso",
        "Funcionário"
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService
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

}
