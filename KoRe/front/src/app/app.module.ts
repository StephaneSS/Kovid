import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputCopyClickComponent } from './common/input-copy-click/input-copy-click.component';
import { ViewInputArgsComponent } from './report/view-input-args/view-input-args.component';
import { ViewSchedulesComponent } from './report/view-schedules/view-schedules.component';
import { ViewDestinationsComponent } from './report/view-destinations/view-destinations.component';

import { ClipboardService } from './services/clipboard/clipboard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    ViewInputArgsComponent,
    ViewSchedulesComponent,
    ViewDestinationsComponent,
    InputCopyClickComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule
  ],
  providers: [ClipboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
