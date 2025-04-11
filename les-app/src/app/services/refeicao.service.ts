import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Refeicao } from '../types/refeição';

@Injectable({
    providedIn: 'root'
})
export class RefeicaoService {

    apiUrl: string = 'http://localhost:8080/refeicao';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpCliente: HttpClient) { }

    list() {
        return this.httpCliente.get<Refeicao[]>(this.apiUrl, this.apiAuth);
    }

    listById(id: number) {
        return this.httpCliente.get<Refeicao>(this.apiUrl + "/" + id, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<Refeicao>) {
        console.log("ID REFEICAO: " + record.dataRegistro);
        if (record._id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Refeicao>) {
        return this.httpCliente.post<Refeicao>(this.apiUrl, record, this.apiAuth).pipe(take(1));
    }

    private update(record: Partial<Refeicao>) {
        return this.httpCliente.put(this.apiUrl + "/" + record._id, record, this.apiAuth).pipe(take(1));
    }

    remove(record: Refeicao) {
        return this.httpCliente.delete(this.apiUrl + "/" + record._id, this.apiAuth).pipe(take(1));
    }
}
