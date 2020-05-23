import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, Renderer2, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidation } from '@validators/confirmPassword';
import { InputComponent } from '@components/elements/input';
import { UserService } from '@services/user';

@Component
({
    selector: 'change-password',
    templateUrl: '../../../templates/pages/settings/change-password.html',
    styleUrls:
    [
        '../../../styles/pages/settings/section.scss'
    ]
})
export class ChangePasswordComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('btn', {static: true}) Button: ElementRef;
    @ViewChildren(InputComponent) Inputs: QueryList<InputComponent>;

    public CurrentPasswordControl: FormControl;
    public PasswordControl: FormControl;
    public ConfirmPasswordControl: FormControl;
    public Form: FormGroup;
    private Listener: any;
    public done: boolean = false;

    constructor(private router: Router, private User: UserService, private Renderer: Renderer2, private CD: ChangeDetectorRef) { }

    ngOnInit()
    {
        this.CurrentPasswordControl = new FormControl
        (
            '',
            [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255),
            ]
        );

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
            currentPassword: this.CurrentPasswordControl,
            password: this.PasswordControl,
            confirmPassword: this.ConfirmPasswordControl
        };

        this.Form = new FormGroup(Group, {validators: ConfirmPasswordValidation.validate});

        this.Listener = this.Form.valueChanges.subscribe(() =>
        {
            if (this.done)
            {
                this.done = false;
            }

            this.CD.detectChanges();
        });
    }

    ngAfterViewInit(): void
    {
        this.CD.detach();
    }

    ngOnDestroy(): void
    {
        if (this.Listener)
        {
            this.Listener.unsubscribe();
        }
    }

    public Submit(): void
    {
        this.Inputs.forEach((input: InputComponent) =>
        {
            input.loading = true;
        });
        this.Renderer.addClass(this.Button.nativeElement, 'active');
        this.Form.disable();

        this.User.ChangePassword(this.CurrentPasswordControl.value, this.PasswordControl.value).subscribe
        (
            () =>
            {
                this.Inputs.forEach((input: InputComponent) =>
                {
                    input.loading = false;
                });
                this.Renderer.removeClass(this.Button.nativeElement, 'active');
                this.Form.enable();
                this.done = true;
                this.CD.detectChanges();
            },
            () =>
            {
                this.router.navigate(['/connect']);
            }
        );
    }
}