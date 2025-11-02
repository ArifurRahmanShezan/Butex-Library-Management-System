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
import { CopyCatalogingComponent } from './components/technical-processing/copy-cataloging/copy-cataloging.component';
import { CatalogRecordsComponent } from './components/technical-processing/catalog-records/catalog-records.component';
import { AuthorityFilesManagementComponent } from './components/technical-processing/authority-files-management/authority-files-management.component';
import { MarcTemplateWorksheetComponent } from './components/technical-processing/marc-template-worksheet/marc-template-worksheet.component';
import { MaterialTypeComponent } from './components/technical-processing/material-type/material-type.component';
import { ItemsForProcessingComponent } from './components/technical-processing/items-for-processing/items-for-processing.component';
import { PatronprevilegeComponent } from './components/circulations/patronprevilege/patronprevilege.component';
import { BindingComponent } from './components/circulations/binding/binding.component';
import { RenewalsComponent } from './components/circulations/renewals/renewals.component';
import { CheckoutComponent } from './components/circulations/checkout/checkout.component';
import { CheckinComponent } from './components/circulations/checkin/checkin.component';
import { OverduesComponent } from './components/circulations/overdues/overdues.component';
import { SubscriptionsComponent } from './components/serialManagement/subscriptions/subscriptions.component';
import { OrderinvoiceComponent } from './components/serialManagement/orderinvoice/orderinvoice.component';
import { RegisterissueComponent } from './components/serialManagement/registerissue/registerissue.component';
import { BindersComponent } from './components/serialManagement/binders/binders.component';
import { OnApprovalsupplyComponent } from './acquisitions/on-approvalsupply/on-approvalsupply.component';
import { SystemParametersComponent } from './components/Administration/system-parameters/system-parameters.component';
import { PatronManagementComponent } from './components/Administration/patron-management/patron-management.component';
import { ServerConfigComponent } from './components/Administration/server-config/server-config.component';
import { LossComponent } from './components/circulations/loss/loss.component';
import { SerialsBindingManagementComponent } from './components/serialManagement/serials-binding-management/serials-binding-management.component';
import { CatalogingTemplateComponent } from './cataloging-template/cataloging-template.component';
import { AuditReportComponent } from './audit-report/audit-report.component';
import { AcquisitionsReportComponent } from './acquisitions-report/acquisitions-report.component';


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
    OnApprovalsupplyComponent,
    MaterialTypeComponent,
    MarcTemplateWorksheetComponent,
    AuthorityFilesManagementComponent,
    CatalogRecordsComponent,
    CopyCatalogingComponent,
    ItemsForProcessingComponent,
    PatronprevilegeComponent,
    BindingComponent,
    RenewalsComponent,
    CheckoutComponent,
    CheckinComponent,
    OverduesComponent,
    SubscriptionsComponent,
    OrderinvoiceComponent,
    RegisterissueComponent,
    BindersComponent,
    SystemParametersComponent,
    PatronManagementComponent,
    ServerConfigComponent,
    LossComponent,
    SerialsBindingManagementComponent,
    CatalogingTemplateComponent,
    AuditReportComponent,
    AcquisitionsReportComponent
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
