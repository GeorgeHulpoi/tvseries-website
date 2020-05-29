import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { TokenService } from '@services/token';
import { UserService } from '@services/user';

@Injectable
({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor
{
    private get userService(): UserService
    {
        return this.injector.get(UserService);
    }

    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if (isPlatformBrowser(this.platformId)) 
        {
            const tokenService = this.injector.get(TokenService);

            const token = tokenService.get();

            if (token != null)
            {
                const tokenType = tokenService.type;
                request = request.clone
                (
                    {
                        setHeaders:
                        {
                            Authorization: `${tokenType} ${token}`
                        }
                    }
                );
            }
        }

        return next.handle(request).pipe
        (
            catchError
            (
                (response) =>
                {       
                    if (isPlatformBrowser(this.platformId)) 
                    {
                        if (response instanceof HttpErrorResponse)
                        {
                            if (response.status === 401)
                            {
                                if (response.statusText === 'Unauthorized') 
                                {
                                    this.userService.reset();
                                }
                            }
                        }
                    }

                    return throwError(response);
                }
            )
        );
    }
}