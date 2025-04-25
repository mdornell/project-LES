import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PermissaoService {
    private permissoes: any[] = [];

    constructor(private http: HttpClient) {
        const local = localStorage.getItem('permissoes');
        if (local) {
            this.permissoes = JSON.parse(local);
        }
    }

    carregarPermissoes(funcionarioId: number) {
        return this.http.get<any[]>(`/permissao/funcionario/${funcionarioId}`).pipe(
            map(response => {
                this.permissoes = response;
                localStorage.setItem('permissoes', JSON.stringify(response)); // Salva no localStorage
                return response;
            })
        );
    }

    temPermissao(tela: string, tipo: 'podeVer' | 'podeAdicionar' | 'podeEditar' | 'podeExcluir'): boolean {
        const permissao = this.permissoes.find(p => p.nomeTela.toLowerCase() === tela.toLowerCase());
        return permissao ? permissao[tipo] : false;
    }

    limparPermissoes() {
        this.permissoes = [];
        localStorage.removeItem('permissoes');
    }
}
