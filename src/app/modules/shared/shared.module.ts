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

@NgModule({
  declarations: [],
  imports: [
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
    MatExpansionModule
  ],
  exports: [
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
    MatExpansionModule
  ]
})
export class SharedModule { }
