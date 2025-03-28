import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Cliente } from '../types/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    apiUrl: string = 'http://localhost:8080/cliente';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpCliente: HttpClient) { }

    list() {
        return this.httpCliente.get<Cliente[]>(this.apiUrl, this.apiAuth);
    }

    listById(id: number) {
        return this.httpCliente.get<Cliente>(this.apiUrl + "/" + id, this.apiAuth).pipe(take(1));
    }

    listByRfid(rfid: string) {
        return this.httpCliente.get<Cliente>(this.apiUrl + "/rfid/" + rfid, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<Cliente>) {
        console.log("ID USER: " + record._id);
        if (record._id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Cliente>) {
        return this.httpCliente.post<Cliente>(this.apiUrl, record, this.apiAuth).pipe(take(1));
    }

    private update(record: Partial<Cliente>) {
        return this.httpCliente.put(this.apiUrl + "/" + record._id, record, this.apiAuth).pipe(take(1));
    }

    remove(record: Cliente) {
        return this.httpCliente.delete(this.apiUrl + "/" + record._id, this.apiAuth).pipe(take(1));
    }
}
