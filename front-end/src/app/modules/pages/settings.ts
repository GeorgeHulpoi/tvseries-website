import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '@modules/elements/input';

import { SettingsPageComponent } from '@components/pages/settings/component';
import { ChangeUsernameComponent } from '@components/pages/settings/change-username';
import { ChangePasswordComponent } from '@components/pages/settings/change-password';
import { BrowserGuardService } from '@guards/Browser';
import { AuthGuardService } from '@guards/Auth';


const routes: Routes =
[
    {
        path: '',
        component: SettingsPageComponent,
        canActivate:
        [
            BrowserGuardService,
            //AuthGuardService
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
        SettingsPageComponent,
        ChangeUsernameComponent,
        ChangePasswordComponent
    ],
    providers: [],
})
export class SettingsPageModule { }
