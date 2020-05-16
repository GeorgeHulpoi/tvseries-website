import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LazyConnectPageModule } from '@modules/pages/lazy-connect';

import { HomePageComponent } from '@components/pages/home';
import { PageNotFoundComponent } from '@components/pages/pagenotfound';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports:
    [
        LazyConnectPageModule,
        RouterModule.forRoot(routes)
    ],
    exports:
    [
        RouterModule
    ],
    declarations:
    [
        HomePageComponent,
        PageNotFoundComponent
    ],
    providers: [],
})
export class RoutingModule { }
