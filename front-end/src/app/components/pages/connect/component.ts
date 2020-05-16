import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

enum States
{
    Email,
    Login,
    Register
}

@Component
({
    templateUrl: '../../../templates/pages/connect/component.html',
    styleUrls:
    [
        '../../../styles/pages/connect/component.scss'
    ],
    animations:
    [
        trigger('anim',
        [
            state('void', style
            ({
                opacity: 0,
            })),
            state('hidden', style
            ({
                opacity: 0,
            })),
            state('visible', style
            ({
                opacity: 1,
            })),
            transition('hidden => visible',
            [
                animate('300ms')
            ]),
            transition('void => visible',
            [
                animate('300ms')
            ]),
            transition('visible => hidden',
            [
                animate('300ms')
            ])
        ])
    ]
})
export class ConnectPageComponent implements OnInit, AfterViewInit
{
    public EmailControl: FormControl;
    public Form: FormGroup;

    private _state: States = States.Email;
    private futureState: States = this.state;
    private _emailVisible: boolean = true;
    private _loginVisible: boolean = false;
    private _registerVisible: boolean = false;
    private _email: string;

    constructor(private CD: ChangeDetectorRef) { }

    ngOnInit()
    {

    }

    ngAfterViewInit(): void
    {
        this.CD.detach();
    }

    public get emailVisible(): boolean
    {
        return this._emailVisible;
    }

    public get loginVisible(): boolean
    {
        return this._loginVisible;
    }

    public get registerVisible(): boolean
    {
        return this._registerVisible;
    }

    public get state(): States
    {
        return this._state;
    }

    public get email(): string
    {
        return this._email;
    }

    public get isEmailState(): boolean
    {
        return this.state === States.Email;
    }

    public get isLoginState(): boolean
    {
        return this.state === States.Login;
    }

    public get isRegisterState(): boolean
    {
        return this.state === States.Register;
    }

    public OnEmailCheckResponse(response: any): void
    {
        if (response.exists)
        {
            this.futureState = States.Login;
        }
        else
        {
            this.futureState = States.Register;
        }

        this._emailVisible = false;
        this._email = response.email;
        this.CD.detectChanges();
    }

    public AnimationDone(event: any): void
    {
        if (event.fromState === 'void' || event.toState === 'void')
        {
            return;
        }

        if (this.state !== this.futureState)
        {
            this._state = this.futureState;

            switch(this.state)
            {
                case States.Email:
                {
                    this._emailVisible = true;
                    break;
                }
                case States.Login:
                {
                    this._loginVisible = true;
                    break;
                }
                case States.Register:
                {
                    this._registerVisible = true;
                    break;
                }
            }

            this.CD.detectChanges();
        }
    }

    public RegisterCanceled()
    {
        this.futureState = States.Email;
        this._registerVisible = false;
        this.CD.detectChanges();
    }

    public LoginCanceled()
    {
        this.futureState = States.Email;
        this._loginVisible = false;
        this.CD.detectChanges();
    }
}