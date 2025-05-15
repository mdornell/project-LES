import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Venda } from '../types/venda';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    private readonly apiUrl = 'http://localhost:8080/venda';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<Venda[]>(this.apiUrl, this.apiAuth);
    }

    listById(id: number) {
        return this.httpClient.get<Venda>(this.apiUrl + "/" + id, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<Venda>) {
        if (record._id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Venda>) {
        return this.httpClient.post<Venda>(this.apiUrl, record, this.apiAuth).pipe(take(1));
    }

    private update(record: Partial<Venda>) {
        return this.httpClient.put(this.apiUrl + "/" + record._id, record, this.apiAuth).pipe(take(1));
    }

    remove(record: Venda) {
        return this.httpClient.delete(this.apiUrl + "/" + record._id, this.apiAuth).pipe(take(1));
    }
}
