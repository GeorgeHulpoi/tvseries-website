import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from '@components/elements/input';

@NgModule
({
    imports:
    [
        CommonModule,
        FormsModule
    ],
    declarations:
    [
        InputComponent
    ],
    exports:
    [
        InputComponent
    ],
    })
export class InputModule { }
