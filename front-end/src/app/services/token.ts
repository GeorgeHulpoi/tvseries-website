import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable
({
    providedIn: 'root'
})
export class TokenService
{
    public static readonly EVENT_STORED: number = 0;
    public static readonly EVENT_DELETED: number = 1;

    private subject: BehaviorSubject<TokenEvent> = new BehaviorSubject<TokenEvent>(null);
    public onChanges: Observable<TokenEvent> = this.subject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId, private HTTP: HttpClient) {}

    /**
     * Ia token-ul (in caz ca este expirat sau nu mai exista, se va emite evenimentul de stergere)
     */
    public get(): string
    {
        let expires_in: string | number = localStorage.getItem('expires_in');

        if (expires_in == null)
        {
            return null;
        }

        expires_in = Number(expires_in);

        if (expires_in <= Math.floor(Date.now() / 1000))
        {
            this.delete();
            return null;
        }

        return localStorage.getItem('token');
    }

    /**
     * Ia tipul token-ului
     */
    public get type(): string 
    {
        return localStorage.getItem('token_type');
    }

    /**
     * Stocheaza un token
     */
    public store(value: Token)
    {
        localStorage.setItem('token', value.access_token);
        localStorage.setItem('token_type', value.token_type);
        localStorage.setItem('expires_in', (Math.floor(Date.now() / 1000) + value.expires_in).toString());
        this.subject.next(TokenService.EVENT_STORED);
    }

    /**
     * Sterge un token
     */
    public delete(): void
    {
        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('expires_in');
        this.subject.next(TokenService.EVENT_DELETED);
    }

    /**
     * Cere un token bazat pe email si parola (folosit pentru logare)
     */
    public request(email: string, password: string): Observable<void>
    {
        const params: any =
        {
            email: `${email}`,
            password: `${password}`
        };

        return this.HTTP.post('/api/user/signin', params).pipe 
        (
            map
            (
                (response: Token) =>
                {
                    this.store(response);
                }
            )
        );
    }

    /**
     * Have token?
     */
    public get hasToken(): boolean
    {
        return (this.get() != null);
    }
}