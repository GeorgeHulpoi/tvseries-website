import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
        BrowserModule.withServerTransition({ appId: 'app' }),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        HttpClientModule,
        InterceptorsModule,
        RoutingModule,
        NavigationBarModule
    ],
    providers: [],
    bootstrap: [ApplicationComponent]
})
export class AppModule { }
