import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { GenresService } from '@services/genres';

@Component
({
    templateUrl: '../../templates/pages/genres.html',
    styleUrls:
    [
        '../../styles/pages/genres.scss'
    ],
})
export class GenresPageComponent implements OnInit, AfterViewInit
{
    public rows: any[] = [];

    constructor(private Genres: GenresService, private CD: ChangeDetectorRef) { }

    ngOnInit(): void 
    {
        this.Genres.get().subscribe((response: Genres) => 
        {
            let genres = response;

            while (genres.length)
            {
                let items_per_row = 2 + Math.round(Math.random());

                if (Math.abs(items_per_row - genres.length) == 1 && items_per_row == 3)
                {
                    items_per_row--;
                }
                else if (Math.abs(items_per_row - genres.length) == 1 && items_per_row == 2)
                {
                    items_per_row++;
                }

                let extracted = genres.splice(0, items_per_row);

                if (extracted.length == 3)
                {
                    extracted.map((item: any) => 
                    {
                        let t = item;
                        t.size = 4;
                        return t;
                    });
                }
                else if (extracted.length == 2)
                {
                    let size = 4 + Math.floor(Math.random() * 4);
                    (extracted[0] as any).size = size;
                    (extracted[1] as any).size = 12 - size;
                }

                this.rows.push(extracted);
            }

            this.CD.detectChanges();
        });
    }

    ngAfterViewInit(): void
    {
        this.CD.detach();
    }
}