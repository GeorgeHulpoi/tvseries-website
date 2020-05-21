import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable
({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor
{
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        request = request.clone
        (
            {
                setHeaders:
                {
                    Accept: 'application/json',
                }
            }
        );

        return next.handle(request);
    }
}