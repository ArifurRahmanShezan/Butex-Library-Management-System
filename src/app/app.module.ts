import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { BudgetComponent } from './acquisitions/budget/budget.component';
import { GiftComponent } from './acquisitions/gift/gift.component';
import { AccessioningComponent } from './acquisitions/accessioning/accessioning.component';
import { FormsModule } from '@angular/forms';
import { RestoreComponent } from './database/restore/restore.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    BudgetComponent,
    GiftComponent,
    AccessioningComponent,
    RestoreComponent
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
