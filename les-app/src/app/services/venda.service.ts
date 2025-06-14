import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Venda } from '../types/venda';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    private readonly apiUrl = 'http://localhost:8080/venda';
    private readonly apiUrl2 = 'http://localhost:8080/relatorios';
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
        return this.httpClient.post(
            this.apiUrl + "/finalizar",
            record,
            {
                ...this.apiAuth,
                responseType: 'text' as 'json'
            }
        ).pipe(take(1));
    }

    private update(record: Partial<Venda>) {
        return this.httpClient.put(this.apiUrl + "/" + record._id, record, this.apiAuth).pipe(take(1));
    }

    remove(record: Venda) {
        return this.httpClient.delete(this.apiUrl + "/" + record._id, this.apiAuth).pipe(take(1));
    }

    getDRE(inicio: string, fim: string) {
        return this.httpClient.get(
            `${this.apiUrl2}/dre?inicio=${encodeURIComponent(inicio)}&fim=${encodeURIComponent(fim)}`,
            this.apiAuth
        ).pipe(take(1));
    }


    getConsumoClientes(inicio: string, fim: string) {
        return this.httpClient.get(
            `${this.apiUrl}/clientes/consumo?inicio=${encodeURIComponent(inicio)}&fim=${encodeURIComponent(fim)}`,
            this.apiAuth
        ).pipe(take(1));
    }

    getTicketMedioClientes(inicio: string, fim: string) {
        return this.httpClient.get(
            `${this.apiUrl}/clientes/ticket-medio?inicio=${encodeURIComponent(inicio)}&fim=${encodeURIComponent(fim)}`,
            this.apiAuth
        ).pipe(take(1));
    }
}
