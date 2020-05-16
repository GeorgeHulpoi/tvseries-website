import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from '@interceptors/Header';
import { TokenInterceptor } from '@interceptors/Token';

@NgModule({
    imports:
    [
        CommonModule,
        HttpClientModule
    ],
    providers:
    [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
})
export class InterceptorsModule {}