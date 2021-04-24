import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadexcelDirective } from './directives/readexcel.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { from } from 'rxjs';
import { MappingComponent } from './mapping/mapping.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HeadersService} from './headers.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
  import {MatTableModule} from '@angular/material/table';
  import {CdkTableModule} from '@angular/cdk/table';
  import {CdkTreeModule} from '@angular/cdk/tree';
  import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ReadexcelDirective,
    MappingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    ScrollingModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule
  ],
  entryComponents: [
   MappingComponent
  ],
  providers: [HeadersService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
