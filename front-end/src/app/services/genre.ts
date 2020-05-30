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
export class GenreService
{
    constructor(@Inject(PLATFORM_ID) private platformId, private transferState: TransferState, private HTTP: HttpClient) {}

    public get(genre: string, page: number): Observable<Genre>
    {
        const key: StateKey<string> = makeStateKey<string>('genre');

        if (isPlatformServer(this.platformId)) 
        {
            let o = this.http(genre, page);

            o.subscribe((response: Genre) => 
            {
                this.transferState.set(key, response);
            });

            return o;
        }
        else 
        {
            const storedResponse = this.transferState.get<Genre>(key, null);
            if (storedResponse) 
            {
                this.transferState.remove(key);
                return of(storedResponse);
            } 
            else 
            {
                return this.http(genre, page);
            }
        }
    }

    private http(genre: string, page: number): Observable<Genre>
    {
        return this.HTTP.get(`/api/genre/${genre}?page=${page}`).pipe
        (
            map((response: Genre) => response),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );    
    }

    private handleError(response: HttpErrorResponse) 
    {
        return throwError(response);
    }
}