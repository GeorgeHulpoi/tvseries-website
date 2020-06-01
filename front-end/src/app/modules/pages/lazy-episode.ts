import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
    {
        path: 'episode',
        loadChildren: () => import('./episode').then(m => m.EpisodePageModule)
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
export class LazyEpisodePageModule {}