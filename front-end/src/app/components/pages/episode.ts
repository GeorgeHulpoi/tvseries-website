import { Component, Renderer2, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EpisodeService } from '@services/episode';

@Component
({
    templateUrl: '../../templates/pages/episode.html',
    styleUrls:
    [
        '../../styles/pages/episode.scss'
    ],
})
export class EpisodePageComponent implements OnInit, AfterViewInit, OnDestroy
{
    private _data: Episode;
    private listener;

    constructor(private Renderer: Renderer2, private Ref: ElementRef, private episodeService: EpisodeService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId, private CD: ChangeDetectorRef) { }

    public get data(): Episode 
    {
        return this._data;
    }

    ngOnInit(): void 
    {
        if (isPlatformBrowser(this.platformId)) 
        {
            this.listener = this.route.paramMap.subscribe((params: ParamMap) => 
            {
                const episode: string = params.get('episode');

                this.episodeService.get(episode).subscribe((data: Episode) => 
                {
                    this._data = data;
                    console.log(data);
                    this.Renderer.setStyle(this.Ref.nativeElement, 'background-image', `url('${data.image}')`);
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
            const episode: string = this.route.snapshot.paramMap.get('episode');
            
            this.episodeService.get(episode).subscribe((data: Episode) => 
            {
                this._data = data;
                this.Renderer.setStyle(this.Ref.nativeElement, 'background-image', `url('${data.image}')`);
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
}