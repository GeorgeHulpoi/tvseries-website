import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
    {
        path: 'settings',
        loadChildren: () => import('./settings').then(m => m.SettingsPageModule)
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
export class LazySettingsPageModule {}