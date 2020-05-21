import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { TokenService } from '@services/token';

@Injectable
({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor
{
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
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

        return next.handle(request).pipe
        (
            catchError
            (
                (response) =>
                {
                    if (response instanceof HttpErrorResponse)
                    {
                        if (response.status === 401)
                        {
                            if (response.error.error == 'invalid_credentials')
                            {
                                return throwError(response);
                            }

                            if (!tokenService.hasToken)
                            {
                                return throwError(response);
                            }
                        }
                    }

                    return throwError(response);
                }
            )
        );
    }
}