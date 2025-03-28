import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Cliente } from "../../types/cliente";
import { ClienteService } from "../cliente.service";


export class ClienteResolver implements Resolve<Cliente> {

    constructor(private service: ClienteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Cliente> {
        const id = route.params?.['id'];
        if (id) {
            return this.service.listById(id);
        }
        return of({
            _id: 0,
            nome: '',
            email: '',
            senha: '',
            codigoRFID: '',
            aniversario: ''
        });
    }
}
