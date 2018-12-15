import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { RecordService } from './record.service';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormResultComponent } from './form/form-result.component';
import { AssessComponent } from './assess/assess.component';
import { AssessDetailComponent } from './assess/assess-detail.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FormViewComponent } from './form/form-view.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AssessComponent,
    AssessDetailComponent,
    AnalyticsComponent,
    FormResultComponent,
    FormViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
