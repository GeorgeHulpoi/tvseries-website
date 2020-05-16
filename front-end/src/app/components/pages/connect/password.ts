import { Component, OnInit, AfterViewInit, OnDestroy, Input, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/user';
import { InputComponent } from '@components/elements/input';

@Component
({
    selector: 'connect-password',
    templateUrl: '../../../templates/pages/connect/password.html'
})

export class ConnectPasswordComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(InputComponent) Input: InputComponent;
    @ViewChild('btn', {static: true}) Button: ElementRef;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

    public PasswordControl: FormControl;
    public Form: FormGroup;

    private listener: any;
    private _email;

    constructor(private router: Router, private Renderer: Renderer2, private User: UserService, private CD: ChangeDetectorRef) { }

    ngOnInit(): void
    {
        this.PasswordControl = new FormControl
        (
            '',
            [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255),
            ]
        );

        const Group =
        {
            password: this.PasswordControl,
        };

        this.Form = new FormGroup(Group);

        this.listener = this.Form.valueChanges.subscribe(() =>
        {
            this.CD.detectChanges();
        });
    }

    ngAfterViewInit(): void
    {
        this.CD.detach();
    }

    ngOnDestroy(): void
    {
        if (this.listener)
        {
            this.listener.unsubscribe();
        }
    }

    public get email(): string
    {
        return this._email;
    }

    @Input()
    public set email(value: string)
    {
        this._email = value;
    }

    public Cancel(): void
    {
        this.cancel.emit(null);
    }

    public submit(): void
    {
        this.Input.loading = true;
        this.Renderer.addClass(this.Button.nativeElement, 'active');
        this.Form.disable();

        this.User.Login(this.email, this.PasswordControl.value).subscribe
        (
            () =>
            {
                this.router.navigate(['/']);
            },
            () =>
            {
                this.Input.loading = false;
                this.Renderer.removeClass(this.Button.nativeElement, 'active');
                this.Form.enable();
            }
        );
    }
}