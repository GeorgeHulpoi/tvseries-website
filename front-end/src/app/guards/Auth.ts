import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@services/user';
import { TokenService } from '@services/token';

@Injectable
({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{
    constructor(private User: UserService, private Token: TokenService, private router: Router) {}

    canActivate(): boolean | Promise<boolean>
    {
        if (this.Token.hasToken)
        {
            if (this.User.isLogged)
            {
                return true;
            }
            else
            {
                return new Promise((resolve, reject) =>
                {
                    const listener = this.User.onChanges.subscribe((event: UserEvent) =>
                    {
                        if (event == UserService.EVENT_FIRST_LOAD)
                        {
                            resolve(true);
                            listener.unsubscribe();
                        }
                    });
                });
            }
        }
        return false;
    }
}