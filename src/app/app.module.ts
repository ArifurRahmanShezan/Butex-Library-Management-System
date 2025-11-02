import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { RestoreComponent } from './components/database/restore/restore.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LettersHolidaysComponent } from './components/Administration/letters-holidays/letters-holidays.component';
import { EodProcessComponent } from './components/Administration/eod-process/eod-process.component';
import { RssFeedComponent } from './components/Administration/rss-feed/rss-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    RestoreComponent,
    DashboardComponent,
    LettersHolidaysComponent,
    EodProcessComponent,
    RssFeedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
