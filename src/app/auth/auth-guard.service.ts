import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authService.isAuthenticated = true;

        if (this.authService.isAuthenticated) {
            return true;
        }

        this.router.navigate(['login'], {
            queryParams: { returnUrl: state.url },
        });

        return false;
    }
}
