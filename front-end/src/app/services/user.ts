import { Injectable, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { TokenService } from '@services/token';

@Injectable
({
    providedIn: 'root'
})
export class UserService
{
    public static readonly EVENT_LOGIN = 0;
    public static readonly EVENT_LOGOUT = 1;
    public static readonly EVENT_FIRST_LOAD = 2;
    public static readonly EVENT_CHANGED_USERNAME = 2;

    private _logged: boolean = false;
    private _id: number;
    private _name: string;
    private _email: string;

    private subject: BehaviorSubject<UserEvent> = new BehaviorSubject<UserEvent>(null);
    public onChanges: Observable<UserEvent> = this.subject.asObservable();

    private HTTP: HttpClient;

    constructor(@Inject(PLATFORM_ID) private platformId, private injector: Injector, private Token: TokenService)
    {
        this.HTTP = this.injector.get(HttpClient);

        if (isPlatformBrowser(this.platformId))
        {
            if (this.Token.hasToken)
            {
                this.HTTP.get('/api/user/me').subscribe
                (
                    (response: UserMeResponse) =>
                    {
                        this._logged = true;
                        this._id = response.id;
                        this._name = response.name;
                        this._email = response.email;
                        this.subject.next(UserService.EVENT_FIRST_LOAD);
                    }
                );
            }
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get email(): string
    {
        return this._email;
    }

    public get isLogged(): boolean
    {
        return this._logged;
    }

    public Check(email: string): Observable<boolean>
    {
        return this.HTTP.get(`/api/user/check?email=${email}`).pipe
        (
            map((response: boolean) => response),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    public Register(name: string, email: string, password: string): Observable<null>
    {
        const body =
        {
            name:     `${name}`,
            email:    `${email}`,
            password: `${password}`
        };

        return this.HTTP.post('/api/user/register', body).pipe
        (
            map((response: Token) =>
            {
                this._logged = true;
                // TODO: id
                this._name = name;
                this._email = email;
                this.Token.store(response);
                this.subject.next(UserService.EVENT_LOGIN);
                return null;
            }),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    public Login(email: string, password: string): Observable<null>
    {
        const body =
        {
            email:    `${email}`,
            password: `${password}`
        };

        return this.HTTP.post('/api/user/login', body).pipe
        (
            map((response: UserLoginResponse) =>
            {
                this._logged = true;
                // TODO: id
                this._name = response.name;
                this._email = email;
                this.Token.store(response);
                this.subject.next(UserService.EVENT_LOGIN);
                return null;
            }),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    public ChangeUsername(value: string): Observable<null>
    {
        const body =
        {
            name: `${value}`
        };

        return this.HTTP.put('/api/user/change-name', body).pipe
        (
            map(() =>
            {
                this._name = value;
                this.subject.next(UserService.EVENT_CHANGED_USERNAME);
                return null;
            }),
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    public ChangePassword(currentPassword: string, newPassword: string): Observable<null>
    {
        const body =
        {
            password: currentPassword,
            new_password: newPassword
        };

        return this.HTTP.put('/api/user/change-password', body).pipe
        (
            map(() =>
            {
                return null;
            }),
            catchError((response: HttpErrorResponse) =>
            {
                if (response.status == 401)
                {
                    this.reset();
                    this.subject.next(UserService.EVENT_LOGOUT);
                }
                return this.handleError(response);
            })
        );
    }

    public Logout(): void
    {
        if (this.isLogged)
        {
            this.HTTP.get('api/user/logout');
            this.reset();
            this.subject.next(UserService.EVENT_LOGOUT);
        }
    }

    public reset(): void
    {
        this._logged = false;
        this._id = null;
        this._email = null;
        this._name = null;
        this.Token.delete();
    }

    private handleError(response: HttpErrorResponse)
    {
        return throwError(response);
    }
}