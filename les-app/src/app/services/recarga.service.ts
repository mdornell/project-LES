import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecargaService {

    apiUrl: string = 'http://localhost:8080/recargas';
    apiAuth: { headers: HttpHeaders } = { headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token") || '') };

    constructor(private httpCliente: HttpClient) { }



    registrarRecarga(recarga: any) {
        return this.httpCliente.post(this.apiUrl + "/registrar", recarga, this.apiAuth).pipe(take(1));
    }

}
