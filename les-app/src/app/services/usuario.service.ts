import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Usuario } from '../types/usuario';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private readonly urlUsuario = 'funcionario';

    constructor(private httpCliente: HttpClient) { }

    list() {
        return this.httpCliente.get<Usuario[]>(this.urlUsuario, { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') });
    }

    listById(id: number) {
        return this.httpCliente.get<Usuario>(this.urlUsuario + '/list/' + id).pipe(take(1));
    }

    save(record: Partial<Usuario>) {
        if (record._id) {
            return this.update(record);
        }
        return this.create(record);
    }

    private create(record: Partial<Usuario>) {
        return this.httpCliente.post<Usuario>(this.urlUsuario + '/add', record).pipe(take(1));
    }

    private update(record: Partial<Usuario>) {
        return this.httpCliente.put(this.urlUsuario + '/update/' + record._id, record).pipe(take(1));
    }

    remove(record: Usuario) {
        return this.httpCliente.delete(this.urlUsuario + '/delete/' + record._id).pipe(take(1));
    }
}
