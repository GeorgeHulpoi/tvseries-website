import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { InputComponent } from '@components/elements/input';
import { NameValidation } from '@validators/name';
import { UserService } from '@services/user';

@Component
({
    selector: 'change-username',
    templateUrl: '../../../templates/pages/settings/change-username.html',
    styleUrls:
    [
        '../../../styles/pages/settings/section.scss'
    ]
})
export class ChangeUsernameComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(InputComponent) Input: InputComponent;
    @ViewChild('btn', {static: true}) Button: ElementRef;

    public UsernameControl: FormControl;
    public Form: FormGroup;
    private Listener: any;

    constructor(private Renderer: Renderer2, private User: UserService, private CD: ChangeDetectorRef) { }

    ngOnInit()
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
        );

        const Group =
        {
            username: this.UsernameControl
        };

        this.Form = new FormGroup(Group);

        this.Listener = this.Form.valueChanges.subscribe(() =>
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
        if (this.Listener)
        {
            this.Listener.unsubscribe();
        }
    }

    public Submit(): void
    {
        this.Input.loading = true;
        this.Renderer.addClass(this.Button.nativeElement, 'active');
        this.Form.disable();

        this.User.ChangeUsername(this.UsernameControl.value).subscribe
        (
            () =>
            {
                this.Input.loading = false;
                this.Renderer.removeClass(this.Button.nativeElement, 'active');
                this.Form.enable();
                this.CD.detectChanges();
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