import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { BudgetComponent } from './acquisitions/budget/budget.component';
import { GiftComponent } from './acquisitions/gift/gift.component';
import { AccessioningComponent } from './acquisitions/accessioning/accessioning.component';
import { RestoreComponent } from './components/database/restore/restore.component';
import { RssFeedComponent } from './components/Administration/rss-feed/rss-feed.component';
import { LettersHolidaysComponent } from './components/Administration/letters-holidays/letters-holidays.component';
import { EodProcessComponent } from './components/Administration/eod-process/eod-process.component';
import { RequestProcessingComponent } from './acquisitions/request-processing/request-processing.component';
import { FirmOrderComponent } from './acquisitions/firm-order/firm-order.component';
import { ClaimComponent } from './acquisitions/claim/claim.component';
import { InvoicepaymentComponent } from './acquisitions/invoicepayment/invoicepayment.component';
//import { OnApprovalsupplyComponent } from './acquisitions/on-approvalsupply/on-approvalsupply.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    BudgetComponent,
    GiftComponent,
    AccessioningComponent,
    RestoreComponent,
    RssFeedComponent,
    LettersHolidaysComponent,
    EodProcessComponent,
    RequestProcessingComponent,
    FirmOrderComponent,
    ClaimComponent,
    InvoicepaymentComponent,
    //OnApprovalsupplyComponent,
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
