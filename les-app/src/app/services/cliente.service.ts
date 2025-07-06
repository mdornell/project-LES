import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Cliente } from '../types/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    apiUrl: string = 'http://localhost:8080/cliente';
    apiUrl2: string = 'http://localhost:8080/recargas';
    apiUrl3: string = 'http://localhost:8080/acesso';

    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpCliente: HttpClient) { }

    list() {
        return this.httpCliente.get<Cliente[]>(this.apiUrl, this.apiAuth);
    }

    listById(id: number) {
        return this.httpCliente.get<Cliente>(this.apiUrl + "/" + id, this.apiAuth).pipe(take(1));
    }

    getClienteByVenda(id: number) {
        return this.httpCliente.get<Cliente>(this.apiUrl + "/venda/" + id, this.apiAuth).pipe(take(1));
    }

    listByRfid(rfid: string) {
        return this.httpCliente.get<Cliente>(this.apiUrl + "/rfid/" + rfid, this.apiAuth).pipe(take(1));
    }

    save(record: Partial<Cliente>) {
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

    listClientesEmAberto(dias?: number) {
        const params = dias !== undefined ? { params: { dias } } : {};
        return this.httpCliente.get<Cliente[]>(this.apiUrl + "/em-aberto", { ...this.apiAuth, ...params }).pipe(take(1));
    }

    registrarRecarga(dto: { clienteId: number; valor: number; }) {
        return this.httpCliente.post(
            this.apiUrl2,
            dto,
            { ...this.apiAuth, responseType: 'text' as 'json' }
        ).pipe(take(1));
    }

    entradaSaida(rfid: string) {
        return this.httpCliente.get<boolean>(
            `${this.apiUrl3}/${rfid}`,
            this.apiAuth
        ).pipe(take(1));
    }

    sair(id: number) {
        return this.httpCliente.get<boolean>(
            `${this.apiUrl3}/sair/${id}`,
            this.apiAuth
        ).pipe(take(1));
    }

    quitarDividas(id: number) {
        return this.httpCliente.post<string>(
            `${this.apiUrl}/${id}/quitar-dividas`,
            {},
            { ...this.apiAuth, responseType: 'text' as 'json' }
        ).pipe(take(1));
    }

    valorDividasAPagar(id: number) {
        return this.httpCliente.get<number>(
            `${this.apiUrl}/${id}/valor-dividas`,
            this.apiAuth
        ).pipe(take(1));
    }
}
