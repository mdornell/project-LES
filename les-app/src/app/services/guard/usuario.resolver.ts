import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Usuario } from "../../types/usuario";
import { UsuarioService } from "../usuario.service";

@Injectable({
    providedIn: 'root'
})
export class UsuarioResolver implements Resolve<Usuario> {

    constructor(private service: UsuarioService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
        if (route.params && route.params['id']) {
            return this.service.listById(route.params['id'])
            // .pipe(
            //     tap(usuario => console.log("Usuário carregado:", usuario))
            // );
        }
        return of({
            _id: 0,
            nome: '',
            email: '',
            senha: '',
            cargo: '',
            codigoRFID: ''
        } as Usuario);
    }
}

