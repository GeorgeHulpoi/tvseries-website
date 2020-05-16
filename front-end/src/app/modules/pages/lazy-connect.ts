import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
    {
        path: 'connect',
        loadChildren: () => import('./connect').then(m => m.ConnectPageModule)
    },
];


@NgModule
({
    imports:
    [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports:
    [
        RouterModule
    ],
    providers: [],
})
export class LazyConnectPageModule {}