import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-refeicao',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './refeicao.component.html',
    styleUrl: './refeicao.component.scss'
})
export class RefeicaoComponent {
    valorKg: string = '';

    refeicoes = [
        { data: '10/01/2025', valor: 18.00 },
        { data: '10/01/2025', valor: 16.00 },
        { data: '10/01/2025', valor: 20.00 },
        { data: '10/01/2025', valor: 22.00 },
        { data: '10/01/2025', valor: 4.00 },
    ];

    paginaAtual = 1;
    itensPorPagina = 5;
    totalItens = 15;

    get totalPaginas(): number {
        return Math.ceil(this.totalItens / this.itensPorPagina);
    }

    get paginas(): number[] {
        return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    }

    mudarPagina(pagina: number) {
        this.paginaAtual = pagina;
        // Aqui pode-se adicionar lógica para carregar novos dados conforme necessário.
    }
}
