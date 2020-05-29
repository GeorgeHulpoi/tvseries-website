import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError , Observable, of } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Injectable
({
    providedIn: 'root'
})
export class GenresService
{
    constructor(@Inject(PLATFORM_ID) private platformId, private transferState: TransferState, private HTTP: HttpClient) {}

    public get(): Observable<Genres>
    {
        const key: StateKey<string> = makeStateKey<string>('genres');

        if (isPlatformServer(this.platformId)) 
        {
            let o = this.http();

            o.subscribe((response: Genres) => 
            {
                this.transferState.set(key, response);
            });

            return o;
        }
        else 
        {
            const storedResponse = this.transferState.get<Genres>(key, null);
            if (storedResponse) 
            {
                this.transferState.remove(key);
                return of(storedResponse);
            } 
            else 
            {
                return this.http();
            }
        }
    }

    private http(): Observable<Genres>
    {
        return this.HTTP.get('/api/genres').pipe
        (
            map((response: Genres) => response),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );    
    }

    private handleError(response: HttpErrorResponse) 
    {
        return throwError(response);
    }
}