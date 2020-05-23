import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { EmailValidation } from '@validators/email';
import { UserService } from '@services/user';
import { InputComponent } from '@components/elements/input';
import { HttpErrorResponse } from '@angular/common/http';

@Component
({
    selector: 'connect-email',
    templateUrl: '../../../templates/pages/connect/email.html',
    styleUrls:
    [
        '../../../styles/pages/connect/section.scss'
    ]
})
export class ConnectEmailComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(InputComponent, {static: true}) Input: InputComponent;
    @ViewChild('btn', {static: true}) Button: ElementRef;

    @Output() response = new EventEmitter<any>();

    public EmailControl: FormControl;
    public Form: FormGroup;

    private listener: any;

    constructor(private Renderer: Renderer2, private CD: ChangeDetectorRef, private User: UserService) { }

    ngOnInit(): void
    {
        this.EmailControl = new FormControl
        (
            '',
            [
                Validators.required,
                Validators.maxLength(255),
                EmailValidation.validate
            ]
        );

        const Group =
        {
            email: this.EmailControl,
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

    public submit(): void
    {
        this.Input.loading = true;
        this.Renderer.addClass(this.Button.nativeElement, 'active');
        this.Form.disable();

        this.User.Check(this.EmailControl.value).subscribe
        (
            (_exists: boolean) =>
            {
                this.response.emit({
                    email: this.EmailControl.value,
                    exists: _exists
                });
                this.Input.loading = false;
                this.Renderer.removeClass(this.Button.nativeElement, 'active');
                this.Form.enable();
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