import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoreComponent } from './components/database/restore/restore.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LettersHolidaysComponent } from './components/Administration/letters-holidays/letters-holidays.component';
import { RssFeedComponent } from './components/Administration/rss-feed/rss-feed.component';
import { EodProcessComponent } from './components/Administration/eod-process/eod-process.component';




const routes: Routes = [
  { path: 'database-restore', component: RestoreComponent },
  { path: '', component: DashboardComponent },
  { path: 'letters-holidays-form', component: LettersHolidaysComponent },
  { path: 'rss', component: RssFeedComponent },
  { path: 'eod', component: EodProcessComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
