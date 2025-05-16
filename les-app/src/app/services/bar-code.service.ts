import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { BarCode } from '../types/barCode';


@Injectable({
    providedIn: 'root'
})
export class BarcodeService {

    private apiUrl: string = 'http://localhost:8080/api/barcode/print';

    private apiAuth = {
        headers: new HttpHeaders().set(
            "Authorization",
            "Bearer " + (localStorage.getItem("auth-token") || '')
        )
    };

    constructor(private http: HttpClient) { }

    imprimir(dto: BarCode) {
        console.log('Enviando JSON:', JSON.stringify(dto));
        return this.http.post<void>(this.apiUrl, dto, this.apiAuth).pipe(take(1));
    }
}
