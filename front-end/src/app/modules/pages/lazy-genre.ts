import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
    {
        path: 'genre',
        loadChildren: () => import('./genre').then(m => m.GenrePageModule)
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
export class LazyGenrePageModule {}