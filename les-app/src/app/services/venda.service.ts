import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Venda } from '../types/venda';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    private readonly apiUrl = 'http://localhost:8080/venda';

    constructor(private httpClient: HttpClient) { }

    private get authHeaders(): { headers: HttpHeaders } {
        const token = localStorage.getItem('auth-token') || '';
        return {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        };
    }

    list(): Observable<Venda[]> {
        return this.httpClient.get<Venda[]>(this.apiUrl, this.authHeaders);
    }

    listById(id: number): Observable<Venda> {
        return this.httpClient.get<Venda>(`${this.apiUrl}/${id}`, this.authHeaders).pipe(take(1));
    }

    save(record: Partial<Venda>): Observable<Venda> {
        return record._id ? this.update(record) : this.create(record);
    }

    private create(record: Partial<Venda>): Observable<Venda> {
        return this.httpClient.post<Venda>(this.apiUrl, record, this.authHeaders).pipe(take(1));
    }

    private update(record: Partial<Venda>): Observable<Venda> {
        return this.httpClient.put<Venda>(`${this.apiUrl}/${record._id}`, record, this.authHeaders).pipe(take(1));
    }

    remove(record: Venda): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${record._id}`, this.authHeaders).pipe(take(1));
    }
}
