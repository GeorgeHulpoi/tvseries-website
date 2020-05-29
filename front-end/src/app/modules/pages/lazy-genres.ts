import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes =
[
    {
        path: 'genres',
        loadChildren: () => import('./genres').then(m => m.GenresPageModule)
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
export class LazyGenresPageModule {}