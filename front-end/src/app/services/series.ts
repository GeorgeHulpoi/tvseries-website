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
export class SeriesService
{
    constructor(@Inject(PLATFORM_ID) private platformId, private transferState: TransferState, private HTTP: HttpClient) {}

    public get(series: string): Observable<Series>
    {
        const key: StateKey<string> = makeStateKey<string>('series');

        if (isPlatformServer(this.platformId)) 
        {
            let o = this.http(series);

            o.subscribe((response: Series) => 
            {
                this.transferState.set(key, response);
            });

            return o;
        }
        else 
        {
            const storedResponse = this.transferState.get<Series>(key, null);
            if (storedResponse) 
            {
                this.transferState.remove(key);
                return of(storedResponse);
            } 
            else 
            {
                return this.http(series);
            }
        }
    }

    private http(series: string): Observable<Series>
    {
        return this.HTTP.get(`/api/series/${series}`).pipe
        (
            map((response: Series) => response),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );    
    }

    private handleError(response: HttpErrorResponse) 
    {
        return throwError(response);
    }
}