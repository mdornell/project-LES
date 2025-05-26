import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Produto } from '../../types/produto';
import { ProdutoService } from '../produto.service';

@Injectable({
    providedIn: 'root'
})
export class ProdutoResolver implements Resolve<Produto> {

    constructor(private service: ProdutoService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Produto> {
        if (route.params && route.params['id']) {
            return this.service.listById(route.params['id']);
        }
        return of({
            _id: 0,
            nome: '',
            descricao: '',
            valorCusto: 0,
            valorVenda: 0,
            estoque: 0,
            codigoBarras: '',
            quantidade: 0,
            ativo: false,

        });
    }
}
