import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { PagamentoFornecedor } from '../../types/pagamento-Fornecedor';
import { PagamentoFornecedorService } from '../pagamento-fornecedor.service';

@Injectable({
    providedIn: 'root'
})
export class PagamentoFornecedorResolver implements Resolve<PagamentoFornecedor> {

    constructor(private service: PagamentoFornecedorService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<PagamentoFornecedor> {
        const id = route.params['id'];

        if (id) {
            return this.service.listById(id).pipe(
                tap(pagamento => console.log('Pagamento de fornecedor carregado:', pagamento))
            );
        }

        return of({
            id: 0,
            dataPagamento: '',
            valor: 0,
            descricao: '',
            dataVencimento: '',
            metodo: '',
            valorPago: 0,
            fornecedor: null
        });
    }
}
