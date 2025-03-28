import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Usuario } from '../types/usuario';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    apiUrl: string = 'http://localhost:8080/funcionario';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpCliente: HttpClient) { }

    list() {
        return this.httpCliente.get<Usuario[]>(this.apiUrl, this.apiAuth);
    }

    listById(id: number) {
        return this.httpCliente.get<Usuario>(this.apiUrl + "/" + id, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<Usuario>) {
        console.log("ID USER: " + record._id);
        if (record._id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Usuario>) {
        return this.httpCliente.post<Usuario>(this.apiUrl, record, this.apiAuth).pipe(take(1));
    }

    private update(record: Partial<Usuario>) {
        return this.httpCliente.put(this.apiUrl + "/" + record._id, record, this.apiAuth).pipe(take(1));
    }

    remove(record: Usuario) {
        return this.httpCliente.delete(this.apiUrl + "/" + record._id, this.apiAuth).pipe(take(1));
    }
}
