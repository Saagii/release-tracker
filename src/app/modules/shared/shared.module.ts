import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NavMenuComponent } from './components/dialog/child-components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './components/dialog/child-components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    ConfirmationComponent
  ],
  imports: [
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSliderModule,
    RouterModule,
    MatDatepickerModule
  ],
  exports: [

    // Modules Exports
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSliderModule,
    MatDatepickerModule,
    RouterModule,

    // Components Exports
    NavMenuComponent,
    ConfirmationComponent
  ]
})
export class SharedModule { }
