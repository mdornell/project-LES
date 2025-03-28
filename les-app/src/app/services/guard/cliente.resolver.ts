import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { Cliente } from "../../types/cliente";
import { ClienteService } from "../cliente.service";


@Injectable({
    providedIn: 'root'
})
export class ClienteResolver implements Resolve<Cliente> {

    constructor(private service: ClienteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Cliente> {
        if (route.params && route.params['id']) {
            return this.service.listById(route.params['id'])
                .pipe(
                    tap(cliente => console.log("Cliente carregado:", cliente))
                );
        }
        return of({
            _id: 0,
            nomeCliente: '',
            email: '',
            senha: '',
            codigoRFID: '',
            aniversario: ''
        });
    }
}
