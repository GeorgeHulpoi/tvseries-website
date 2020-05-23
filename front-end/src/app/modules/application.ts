import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InterceptorsModule } from '@modules/interceptors';
import { RoutingModule } from '@modules/routing';
import { NavigationBarModule } from '@modules/navigation-bar';

import { ApplicationComponent } from '@components/application';
import { IconsDefComponent } from '@components/icons-defs';

@NgModule({
    declarations:
    [
        ApplicationComponent,
        IconsDefComponent
    ],
    imports:
    [
        BrowserAnimationsModule,
        InterceptorsModule,
        RoutingModule,
        NavigationBarModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' })
    ],
    providers: [],
    bootstrap: [ApplicationComponent]
})
export class AppModule { }
