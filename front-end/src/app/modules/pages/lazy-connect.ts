import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LogoutComponent } from '@components/pages/logout';

const routes: Routes =
[
    {
        path: 'connect',
        loadChildren: () => import('./connect').then(m => m.ConnectPageModule)
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];


@NgModule
({
    imports:
    [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    declarations:
    [
        LogoutComponent
    ],
    exports:
    [
        RouterModule
    ],
    providers: [],
})
export class LazyConnectPageModule {}