import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LettersHolidaysComponent } from './components/Administration/letters-holidays/letters-holidays.component';
import { RssFeedComponent } from './components/Administration/rss-feed/rss-feed.component';
import { EodProcessComponent } from './components/Administration/eod-process/eod-process.component';

import { BudgetComponent } from './acquisitions/budget/budget.component';
import { GiftComponent } from './acquisitions/gift/gift.component';
import { AccessioningComponent } from './acquisitions/accessioning/accessioning.component';
import { RestoreComponent } from './components/database/restore/restore.component';




const routes: Routes = [
  { path: 'database-restore', component: RestoreComponent },
  { path: '', component: DashboardComponent },
  { path: 'letters-holidays-form', component: LettersHolidaysComponent },
  { path: 'rss', component: RssFeedComponent },
  { path: 'eod', component: EodProcessComponent },
  { path: 'budget-vendor', component: BudgetComponent} ,
  { path:'gift',component:GiftComponent},
  { path:'accesssioning',component:AccessioningComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
