import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { LazyConnectPageModule } from '@modules/pages/lazy-connect';
import { LazySettingsPageModule } from '@modules/pages/lazy-settings';
import { LazyGenresPageModule } from '@modules/pages/lazy-genres';

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

const routerOptions: ExtraOptions =
{
    useHash: false,
    anchorScrolling: 'enabled'
};

@NgModule({
    imports:
    [
        LazyConnectPageModule,
        LazySettingsPageModule,
        LazyGenresPageModule,
        RouterModule.forRoot(routes, routerOptions)
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
