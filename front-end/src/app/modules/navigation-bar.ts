import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationBarComponent } from '@components/navigation-bar/component';
import { UserComponent } from '@components/navigation-bar/user';
import { MenuComponent } from '@components/navigation-bar/menu';

@NgModule({
    imports:
    [
        CommonModule,
        RouterModule
    ],
    exports:
    [
        NavigationBarComponent
    ],
    declarations:
    [
        NavigationBarComponent,
        UserComponent,
        MenuComponent
    ],
    providers: [],
})
export class NavigationBarModule { }
