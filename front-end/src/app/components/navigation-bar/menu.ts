import { Component, AfterViewInit, ChangeDetectorRef, Input, ElementRef } from '@angular/core';

@Component
({
    selector: 'menu',
    templateUrl: '../../templates/navigation-bar/menu.html',
    styleUrls:
    [
        '../../styles/navigation-bar/menu.scss'
    ]
})
export class MenuComponent implements AfterViewInit
{
    private _list: Url[] = [];

    constructor(private CD: ChangeDetectorRef, private Ref: ElementRef) {}

    ngAfterViewInit(): void
    {
        this.CD.detach();
    }

    public get element(): any
    {
        return this.Ref.nativeElement;
    }

    public get list(): Url[]
    {
        return this._list;
    }

    @Input()
    public set list(value: Url[])
    {
        this._list = value;
        this.CD.detectChanges();
    }
}