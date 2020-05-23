import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { UserService } from '@services/user';

@Component
({
    selector: 'user',
    templateUrl: '../../templates/navigation-bar/user.html',
    styleUrls:
    [
        '../../styles/navigation-bar/user.scss'
    ]
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy
{
    private listener: any;

    constructor(private CD: ChangeDetectorRef, private User: UserService, private Ref: ElementRef) {}

    ngOnInit(): void
    {
        this.listener = this.User.onChanges.subscribe((event: UserEvent) =>
        {
            if (event !== null)
            {
                this.CD.detectChanges();
            }
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

    public get element(): any
    {
        return this.Ref.nativeElement;
    }

    public get name(): string
    {
        return this.User.name;
    }

    public get isLogged(): boolean
    {
        return this.User.isLogged;
    }
}