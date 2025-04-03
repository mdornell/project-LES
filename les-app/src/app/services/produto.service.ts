import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Produto } from '../types/produto';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    apiUrl: string = 'http://localhost:8080/produto';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpCliente: HttpClient) { }

    list() {
        return this.httpCliente.get<Produto[]>(this.apiUrl, this.apiAuth);
    }

    listById(id: number) {
        return this.httpCliente.get<Produto>(this.apiUrl + "/" + id, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<Produto>) {
        if (record._id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Produto>) {
        return this.httpCliente.post<Produto>(this.apiUrl, record, this.apiAuth).pipe(take(1));
    }

    private update(record: Partial<Produto>) {
        return this.httpCliente.put(this.apiUrl + "/" + record._id, record, this.apiAuth).pipe(take(1));
    }

    remove(record: Produto) {
        return this.httpCliente.delete(this.apiUrl + "/" + record._id, this.apiAuth).pipe(take(1));
    }
}
