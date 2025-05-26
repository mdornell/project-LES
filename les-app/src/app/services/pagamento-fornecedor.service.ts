import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { PagamentoFornecedor } from '../types/pagamento-Fornecedor';

@Injectable({
    providedIn: 'root'
})
export class PagamentoFornecedorService {

    apiUrl: string = 'http://localhost:8080/pagamentos';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<PagamentoFornecedor[]>(this.apiUrl, this.apiAuth).pipe(take(1));
    }

    listById(id: number) {
        return this.http.get<PagamentoFornecedor>(`${this.apiUrl}/${id}`, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<PagamentoFornecedor>, fornecedorId?: number) {
        console.log('record', record);
        console.log('fornecedor id', fornecedorId);
        if (record._id) {
            return this.update(record._id, record);
        }
        return this.create(record, fornecedorId);
    }

    private create(record: Partial<PagamentoFornecedor>, fornecedorId?: number) {
        const options = fornecedorId
            ? { ...this.apiAuth, params: { fornecedorId: fornecedorId.toString() } }
            : this.apiAuth;
        return this.http.post<PagamentoFornecedor>(this.apiUrl, record, options).pipe(take(1));
    }

    private update(id: number, record: Partial<PagamentoFornecedor>) {
        return this.http.put<PagamentoFornecedor>(`${this.apiUrl}/${id}`, record, this.apiAuth).pipe(take(1));
    }

    remove(record: PagamentoFornecedor) {
        return this.http.delete(`${this.apiUrl}/${record._id}`, this.apiAuth).pipe(take(1));
    }

    listByFornecedorId(fornecedorId: number) {
        return this.http.get<PagamentoFornecedor[]>(`${this.apiUrl}/fornecedor/${fornecedorId}`, this.apiAuth).pipe(take(1));
    }
}
