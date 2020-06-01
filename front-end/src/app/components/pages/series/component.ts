import { Component, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SeriesService } from '@services/series';
import { HttpErrorResponse } from '@angular/common/http';

@Component
({
    templateUrl: '../../../templates/pages/series/component.html',
    styleUrls:
    [
        '../../../styles/pages/series/component.scss'
    ],
})
export class SeriesPageComponent implements OnInit, AfterViewInit, OnDestroy
{
    private listener;
    private _data: Series;

    constructor(private seriesService: SeriesService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId, private CD: ChangeDetectorRef) { }

    public get data(): Series 
    {
        return this._data;
    }

    ngOnInit(): void 
    {
        if (isPlatformBrowser(this.platformId)) 
        {
            this.listener = this.route.paramMap.subscribe((params: ParamMap) => 
            {
                const series: string = params.get('series');

                this.seriesService.get(series).subscribe((response: Series) => 
                {
                    this._data = response;
                    this._data.seasons.sort(this.compareSeason);
                    this.CD.detectChanges();
                }, 
                (response: HttpErrorResponse) => 
                {
                    if (response.status == 404)
                    {
                        this.router.navigateByUrl('404', {skipLocationChange: true});
                    }
                });
            });
        }
        else if (isPlatformServer(this.platformId))
        {
            const series: string = this.route.snapshot.paramMap.get('series');
            
            this.seriesService.get(series).subscribe((response: Series) => 
            {
                this._data = response;
                this._data.seasons.sort(this.compareSeason);
                this.CD.detectChanges();
            },
            (response: HttpErrorResponse) => 
            {
                if (response.status == 404)
                {
                    this.router.navigateByUrl('404', {skipLocationChange: true});
                }
            });
        }
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

    private compareSeason(a: Season, b: Season) 
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
}