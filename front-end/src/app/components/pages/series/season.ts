import { Component, ChangeDetectorRef, Renderer2, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component
({
    selector: 'season',
    templateUrl: '../../../templates/pages/series/season.html',
    styleUrls:
    [
        '../../../styles/pages/series/season.scss'
    ],
})
export class SeasonComponent implements AfterViewInit
{
    @ViewChild('episodes', {static: true}) EpisodesRef!: ElementRef;

    private active: boolean = false;
    private rendered: boolean = false;
    private _data: Season;

    constructor(private Renderer: Renderer2, private CD: ChangeDetectorRef) { }

    public get data(): Season 
    {
        return this._data;
    }

    @Input()
    public set data(value: Season)
    {
        this._data = value;
        this._data.episodes.sort(this.compareEpisode);
        if (this.rendered)
        {
            this.CD.detectChanges();
        }
    }
    
    ngAfterViewInit(): void
    {
        this.CD.detach();
        this.rendered = true;
    }

    private compareEpisode(a: Episode, b: Episode) 
    {
        if (a.index < b.index) 
        {
            return -1;
        }
        if (a.index > b.index) 
        {
            return 1;
        }

        return 0;
    }

    public SeasonClick(): void 
    {
        this.active = !this.active;

        if (this.active)
        {
            this.Renderer.setStyle(this.EpisodesRef.nativeElement, 'height', (1.75 * this.data.episodes.length + 2) + 'rem');
        }
        else 
        {
            this.Renderer.setStyle(this.EpisodesRef.nativeElement, 'height', '0rem');
        }
    }
}