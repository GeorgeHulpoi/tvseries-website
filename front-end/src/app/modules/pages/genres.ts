import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GenresPageComponent } from '@components/pages/genres';

const routes: Routes =
[
    {
        path: '',
        component: GenresPageComponent
    }
];

@NgModule({
    imports:
    [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:
    [
        RouterModule
    ],
    declarations:
    [
        GenresPageComponent,
    ],
    providers: [],
})
export class GenresPageModule { }
