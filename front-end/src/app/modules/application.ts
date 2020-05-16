import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InterceptorsModule } from '@modules/interceptors';
import { RoutingModule } from '@modules/routing';

import { ApplicationComponent } from '@components/application';

@NgModule({
    declarations:
    [
        ApplicationComponent
    ],
    imports:
    [
        BrowserAnimationsModule,
        InterceptorsModule,
        RoutingModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' })
    ],
    providers: [],
    bootstrap: [ApplicationComponent]
})
export class AppModule { }
