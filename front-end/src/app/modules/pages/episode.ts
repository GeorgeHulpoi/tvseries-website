import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaginationModule } from '@modules/elements/pagination';

import { EpisodePageComponent } from '@components/pages/episode';
import { SafeHtmlPipe } from '@pipes/safeHtml';

const routes: Routes =
[
    {
        path: ':episode',
        component: EpisodePageComponent
    }
];

@NgModule({
    imports:
    [
        CommonModule,
        RouterModule.forChild(routes),
        PaginationModule
    ],
    exports:
    [
        RouterModule
    ],
    declarations:
    [
        EpisodePageComponent,
        SafeHtmlPipe
    ],
    providers: [],
})
export class EpisodePageModule { }
