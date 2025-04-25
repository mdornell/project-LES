import { CanActivateFn } from '@angular/router';

export const refeicaoGuard: CanActivateFn = (route, state) => {
  return true;
};
