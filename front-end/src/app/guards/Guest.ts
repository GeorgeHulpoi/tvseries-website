import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '@services/token';

@Injectable
({
    providedIn: 'root'
})
export class GuestGuardService implements CanActivate 
{
    constructor(private Token: TokenService, private router: Router) {}

    canActivate(): boolean
    {
        if (this.Token.hasToken)
        {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}