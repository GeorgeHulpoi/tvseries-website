import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaginationModule } from '@modules/elements/pagination';

import { GenrePageComponent } from '@components/pages/genre';

const routes: Routes =
[
    {
        path: ':genre',
        component: GenrePageComponent
    },
    {
        path: ':genre/page/:page',
        component: GenrePageComponent
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
        GenrePageComponent,
    ],
    providers: [],
})
export class GenrePageModule { }
