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

    listarPorFuncionario(id: number) {
        return this.http.get<any[]>(`/permissao/funcionario/${id}`).pipe(
            map(permissoes => {
                this.permissoes = permissoes;
                localStorage.setItem('permissoes', JSON.stringify(permissoes));
                return permissoes;
            })
        );
    }

    salvarPermissoes(id: number, permissoes: any[]) {
        return this.http.post<void>(`/permissao/funcionario/${id}`, permissoes).pipe(
            map(() => {
                this.permissoes = permissoes;
                localStorage.setItem('permissoes', JSON.stringify(permissoes));
            })
        );
    }
}
