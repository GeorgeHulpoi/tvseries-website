import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from '../interceptors/Universal';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './application';
import { ApplicationComponent } from '../components/application';

@NgModule
({
    imports: 
    [
        AppModule,
        ServerModule,
        ServerTransferStateModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalInterceptor,
        multi: true
    }],
    bootstrap: [ApplicationComponent],
})
export class ApplicationServerModule {}