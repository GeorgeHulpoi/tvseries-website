import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Injectable
({
    providedIn: 'root'
})
export class BrowserGuardService implements CanActivate 
{
    constructor(@Inject(PLATFORM_ID) private platformId, private router: Router) {}

    canActivate(): boolean
    {
        if (isPlatformServer(this.platformId))
        {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}