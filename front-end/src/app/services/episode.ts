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
export class EpisodeService
{
    constructor(@Inject(PLATFORM_ID) private platformId, private transferState: TransferState, private HTTP: HttpClient) {}

    public get(episode: string): Observable<Episode>
    {
        const key: StateKey<string> = makeStateKey<string>('episode');

        if (isPlatformServer(this.platformId)) 
        {
            let o = this.http(episode);

            o.subscribe((response: Episode) => 
            {
                this.transferState.set(key, response);
            });

            return o;
        }
        else 
        {
            const storedResponse = this.transferState.get<Episode>(key, null);
            if (storedResponse) 
            {
                this.transferState.remove(key);
                return of(storedResponse);
            } 
            else 
            {
                return this.http(episode);
            }
        }
    }

    private http(episode: string): Observable<Episode>
    {
        return this.HTTP.get(`/api/episode/${episode}`).pipe
        (
            map((response: Episode) => response),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );    
    }

    private handleError(response: HttpErrorResponse) 
    {
        return throwError(response);
    }
}