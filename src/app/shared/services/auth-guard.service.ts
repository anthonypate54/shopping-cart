import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, public  router:  Router) { }

    canActivate(route, state: RouterStateSnapshot) {
        return this.auth.user$.pipe(
            map( user => {
                if(user)
                    return true;
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            }),
        );
    }
}
