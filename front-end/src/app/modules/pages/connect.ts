import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '@modules/elements/input';

import { ConnectPageComponent } from '@components/pages/connect/component';
import { ConnectEmailComponent } from '@components/pages/connect/email';
import { ConnectPasswordComponent } from '@components/pages/connect/password';
import { ConnectRegisterComponent } from '@components/pages/connect/register';
import { GuestGuardService } from '@guards/Guest';
import { BrowserGuardService } from '@guards/Browser';

const routes: Routes =
[
    {
        path: '',
        component: ConnectPageComponent,
        canActivate:
        [
            GuestGuardService,
            BrowserGuardService
        ]
    }
];

@NgModule({
    imports:
    [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        InputModule
    ],
    exports:
    [
        RouterModule
    ],
    declarations:
    [
        ConnectPageComponent,
        ConnectEmailComponent,
        ConnectPasswordComponent,
        ConnectRegisterComponent
    ],
    providers: [],
})
export class ConnectPageModule { }
