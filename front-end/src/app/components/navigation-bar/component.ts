import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { UserService } from '@services/user';
import { MenuComponent } from './menu';
import { UserComponent } from './user';

@Component
({
    selector: 'navigation-bar',
    templateUrl: '../../templates/navigation-bar/component.html',
    styleUrls:
    [
        '../../styles/navigation-bar/component.scss'
    ]
})
export class NavigationBarComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(UserComponent, {static: true}) UserRef: UserComponent;
    @ViewChild(MenuComponent, {static: true}) MenuRef: MenuComponent;
    @ViewChild('container', {static: true}) ContainerRef: ElementRef;
    @ViewChild('logo', {static: true}) LogoRef: ElementRef;
    @ViewChild('verticalBar', {static: true}) VerticalBarRef: ElementRef;

    public menu: Url[] =
    [
        {
            name: 'Item 1',
            href: '/'
        },
        {
            name: 'Item 2',
            href: '/'
        },
        {
            name: 'Item 3',
            href: '/'
        }
    ];

    private _overflow: boolean = false;
    private _extended: boolean = false;

    private lastWidth: number = 0;
    private rAF;
    private listener;

    constructor(private Renderer: Renderer2, private User: UserService, private CD: ChangeDetectorRef, private Ref: ElementRef) {}

    private get element(): any
    {
        return this.Ref.nativeElement;
    }

    public get overflow(): boolean
    {
        return this._overflow;
    }

    public set overflow(value: boolean)
    {
        this._overflow = value;

        if (value)
        {
            this.Renderer.addClass(this.element, 'overflow');
        }
        else
        {
            this.Renderer.removeClass(this.element, 'overflow');
            if (this.extended)
            {
                this.extended = false;
            }
        }
    }

    public get extended(): boolean
    {
        return this._extended;
    }

    public set extended(value: boolean)
    {
        this._extended = value;

        if (value)
        {
            disableBodyScroll(this.VerticalBarRef.nativeElement);
            this.Renderer.addClass(this.element, 'extended');
        }
        else
        {
            enableBodyScroll(this.VerticalBarRef.nativeElement);
            this.Renderer.removeClass(this.element, 'extended');
        }
    }

    ngOnInit(): void
    {
        this.listener = this.User.onChanges.subscribe((event: UserEvent) =>
        {
            if (event !== null)
            {
                this.CheckSize();
            }
        });
    }

    ngAfterViewInit(): void
    {
        this.CD.detach();
        this.CheckSize();
    }

    ngOnDestroy(): void
    {
        if (this.listener)
        {
            this.listener.unsubscribe();
        }
    }

    @HostListener('window:resize')
    public OnResizeCallback()
    {
        if (this.rAF)
        {
            window.cancelAnimationFrame(this.rAF);
        }

        this.rAF = window.requestAnimationFrame(() =>
        {
            this.CheckSize();
        });
    }

    private CheckSize(): void
    {
        const containerWidth: number = this.ContainerRef.nativeElement.clientWidth;
        let width: number;

        if (this.overflow)
        {
            width = this.lastWidth;
        }
        else
        {
            const logoWidth = this.LogoRef.nativeElement.offsetWidth;
            const menuWidth = this.MenuRef.element.offsetWidth;
            const userWidth = this.UserRef.element.offsetWidth;

            width = logoWidth + menuWidth + userWidth;
        }

        if (width > containerWidth)
        {
            this.overflow = true;
            this.lastWidth = width;
        }
        else
        {
            this.overflow = false;
        }
    }

    public OpenVerticalMenu(): void
    {
        this.extended = true;
    }

    public CloseVerticalMenu(): void
    {
        this.extended = false;
    }
}