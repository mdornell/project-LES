import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Fornecedor } from '../../types/fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Injectable({
    providedIn: 'root'
})
export class FornecedorResolver implements Resolve<Fornecedor> {

    constructor(private service: FornecedorService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Fornecedor> {
        if (route.params && route.params['id']) {
            return this.service.listById(route.params['id']);
        }
        return of({
            _id: 0,
            nome: '',
            email: '',
            telefone: '',
            endereco: '',
            cnpj: ''
        });
    }
}
