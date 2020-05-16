import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { TokenService } from '@services/token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
    constructor(private Token: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const token = this.Token.get();

        if (token != null)
        {
            const tokenType = this.Token.type;
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

                            if (!this.Token.hasToken)
                            {
                                return throwError(response);
                            }

                            this.Token.delete();

                            alert('Your token has expired!');
                        }
                    }

                    return throwError(response);
                }
            )
        );
    }
}