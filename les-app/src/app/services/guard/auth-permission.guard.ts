import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissaoService } from '../permissoes.service';


@Injectable({
    providedIn: 'root'
})
export class AuthPermissionGuard implements CanActivate {

    constructor(private permissaoService: PermissaoService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const tela = route.data['tela'];
        const tipo = route.data['tipo'];

        if (this.permissaoService.temPermissao(tela, tipo)) {
            return true;
        } else {
            this.router.navigate(['/acesso-negado']); // Redireciona para página de erro
            return false;
        }
    }
}
