import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { FormResultComponent } from './form/form-result.component';
import { FormViewComponent } from './form/form-view.component';
import { AssessComponent } from './assess/assess.component';
import { AssessDetailComponent } from './assess/assess-detail.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: '', redirectTo: 'form/', pathMatch: 'full' },
  { path: 'form',  component: FormComponent },
  { path: 'form/:guid',  component: FormComponent },
  { path: 'form/result/:guid',  component: FormResultComponent },
  { path: 'form/view/:guid',  component: FormViewComponent },
  { path: 'assess',  component: AssessComponent },
  { path: 'assess/:guid',  component: AssessDetailComponent },
  //{ path: 'analyzer/:id', component: HeroDetailComponent }
  { path: 'analytics',  component: AnalyticsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
