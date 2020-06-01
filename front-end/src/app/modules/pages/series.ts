import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SeriesPageComponent } from '@components/pages/series/component';
import { SeasonComponent } from '@components/pages/series/season';

const routes: Routes =
[
    {
        path: ':series',
        component: SeriesPageComponent
    }
];

@NgModule({
    imports:
    [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports:
    [
        RouterModule
    ],
    declarations:
    [
        SeriesPageComponent,
        SeasonComponent
    ],
    providers: [],
})
export class SeriesPageModule { }
