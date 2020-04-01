import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputCopyClickComponent } from './common/input-copy-click/input-copy-click.component';
import { ViewInputArgsComponent } from './report/view-input-args/view-input-args.component';
import { ViewSchedulesComponent } from './report/view-schedules/view-schedules.component';
import { ViewDestinationsComponent } from './report/view-destinations/view-destinations.component';
import { ViewReportComponent, OutputParametersDialog } from './report/view-report/view-report.component';
import { ViewExecutionsComponent } from './report/view-executions/view-executions.component';
import { ViewPostprocessComponent } from './report/view-postprocess/view-postprocess.component';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { EditReportComponent } from './report/edit-report/edit-report.component';
import { DialogEditReportComponent } from './report/dialog-edit-report/dialog-edit-report.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SmtpComponent } from './report/destination/smtp/smtp.component';
import { FtpComponent } from './report/destination/ftp/ftp.component';
import { SftpComponent } from './report/destination/sftp/sftp.component';
import { FolderComponent } from './report/destination/folder/folder.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    ViewInputArgsComponent,
    ViewSchedulesComponent,
    ViewDestinationsComponent,
    ViewReportComponent,
    OutputParametersDialog,
    InputCopyClickComponent,
    ViewExecutionsComponent,
    ViewPostprocessComponent,
    EditReportComponent,
    DialogEditReportComponent,
    SmtpComponent,
    FtpComponent,
    SftpComponent,
    FolderComponent
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
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    DragDropModule
  ],
  providers: [ClipboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
