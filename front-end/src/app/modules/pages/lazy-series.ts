import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
    {
        path: 'series',
        loadChildren: () => import('./series').then(m => m.SeriesPageModule)
    }
];

@NgModule
({
    imports:
    [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports:
    [
        RouterModule
    ]
})
export class LazySeriesPageModule {}