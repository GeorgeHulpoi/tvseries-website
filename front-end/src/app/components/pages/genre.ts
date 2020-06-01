import { Component, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { GenreService } from '@services/genre';
import { HttpErrorResponse } from '@angular/common/http';

@Component
({
    templateUrl: '../../templates/pages/genre.html',
    styleUrls:
    [
        '../../styles/pages/genre.scss'
    ],
})
export class GenrePageComponent implements OnInit, AfterViewInit, OnDestroy
{
    private _data: Genre;
    private _page: number;

    private listener;

    constructor(private genreService: GenreService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId, private CD: ChangeDetectorRef) { }

    public get data(): Genre 
    {
        return this._data;
    }

    public get page(): number 
    {
        return this._page;
    }

    ngOnInit(): void 
    {
        if (isPlatformBrowser(this.platformId)) 
        {
            this.listener = this.route.paramMap.subscribe((params: ParamMap) => 
            {
                const genre: string = params.get('genre');
                this._page = Number(params.get('page'));

                if (this.page < 1)
                {
                    this._page = 1;
                }

                this.genreService.get(genre, this.page).subscribe((data: Genre) => 
                {
                    this._data = data;
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
            const genre: string = this.route.snapshot.paramMap.get('genre');
            let page: number = Number(this.route.snapshot.paramMap.get('genre'));
            
            if (page < 1)
            {
                page = 1;
            }
            
            this.genreService.get(genre, page).subscribe((data: Genre) => 
            {
                this._data = data;
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

    public OnPageChange(value)
    {
        this.router.navigate([`/genre/${this.data.url}/page/${value}`]); 
    }
}