import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component
({
    templateUrl: '../../../templates/pages/settings/component.html',
    styleUrls:
    [
        '../../../styles/pages/settings/component.scss'
    ]
})
export class SettingsPageComponent implements AfterViewInit
{
    constructor(private CD: ChangeDetectorRef) { }

    ngAfterViewInit(): void
    {
        this.CD.detach();
    }
}