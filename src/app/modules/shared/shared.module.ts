import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        AngularMultiSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        AngularMultiSelectModule
    ],
    providers: []
})
export class SharedModule { }
