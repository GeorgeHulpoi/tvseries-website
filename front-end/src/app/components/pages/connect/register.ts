import { Component, Renderer2, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidation } from '@validators/confirmPassword';
import { NameValidation } from '@validators/name';
import { UserService } from '@services/user';
import { InputComponent } from '@components/elements/input';

@Component
({
    selector: 'connect-register',
    templateUrl: '../../../templates/pages/connect/register.html',
    styleUrls:
    [
        '../../../styles/pages/connect/section.scss'
    ]
})

export class ConnectRegisterComponent implements OnInit, AfterViewInit
{
    @ViewChild('btn', {static: true}) Button: ElementRef;
    @ViewChildren(InputComponent) Inputs: QueryList<InputComponent>;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

    public UsernameControl: FormControl;
    public PasswordControl: FormControl;
    public ConfirmPasswordControl: FormControl;
    public Form: FormGroup;

    private listener: any;
    private _email;

    constructor(private router: Router, private Renderer: Renderer2, private User: UserService, private CD: ChangeDetectorRef) { }

    ngOnInit(): void
    {
        this.UsernameControl = new FormControl
        (
            '',
            [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(255),
                NameValidation.validate
            ]
        )

        this.PasswordControl = new FormControl
        (
            '',
            [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255),
            ]
        );

        this.ConfirmPasswordControl = new FormControl
        (
            '',
            [
                Validators.required,
            ]
        );

        const Group =
        {
            username: this.UsernameControl,
            password: this.PasswordControl,
            confirmPassword: this.ConfirmPasswordControl
        };

        this.Form = new FormGroup(Group, {validators: ConfirmPasswordValidation.validate});

        this.listener = this.Form.valueChanges.subscribe(() =>
        {
            this.CD.detectChanges();
        });
    }

    ngAfterViewInit(): void
    {
        this.CD.detach();
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
        this.Inputs.forEach((input: InputComponent) =>
        {
            input.loading = true;
        });
        this.Renderer.addClass(this.Button.nativeElement, 'active');
        this.Form.disable();

        this.User.Register(this.Form.value.username, this.email, this.Form.value.password).subscribe
        (
            () =>
            {
                this.router.navigate(['/']);
            },
            () =>
            {
                this.Inputs.forEach((input: InputComponent) =>
                {
                    input.loading = false;
                });
                this.Renderer.removeClass(this.Button.nativeElement, 'active');
                this.Form.enable();
            }
        );
    }
}