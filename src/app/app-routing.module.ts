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
import { RequestProcessingComponent } from './acquisitions/request-processing/request-processing.component';
import { FirmOrderComponent } from './acquisitions/firm-order/firm-order.component';
import { ClaimComponent } from './acquisitions/claim/claim.component';
import { InvoicepaymentComponent } from './acquisitions/invoicepayment/invoicepayment.component';
import { CopyCatalogingComponent } from './components/technical-processing/copy-cataloging/copy-cataloging.component';
import { CatalogRecordsComponent } from './components/technical-processing/catalog-records/catalog-records.component';
import { MaterialTypeComponent } from './components/technical-processing/material-type/material-type.component';
import { MarcTemplateWorksheetComponent } from './components/technical-processing/marc-template-worksheet/marc-template-worksheet.component';
import { AuthorityFilesManagementComponent } from './components/technical-processing/authority-files-management/authority-files-management.component';
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
import { PatronCategoryComponent } from './patron-category/patron-category.component';
import { PatronComponent } from './patron/patron.component';
import { TrailComponent } from './trail/trail.component';




const routes: Routes = [
  { path: 'database-restore', component: RestoreComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'letters-holidays-form', component: LettersHolidaysComponent },
  { path: 'rss', component: RssFeedComponent },
  { path: 'eod', component: EodProcessComponent },
  { path: 'budget-vendor', component: BudgetComponent} ,
  { path: 'gift',component:GiftComponent},
  { path: 'accesssioning',component:AccessioningComponent},
  { path: 'Request-Processing',component:RequestProcessingComponent},
  { path: 'On-Approval-Supplies',component:OnApprovalsupplyComponent},
  { path: 'firm-order',component:FirmOrderComponent},
  { path: 'claim',component:ClaimComponent},
  { path: 'invoice-payment',component:InvoicepaymentComponent},
  { path: 'material-type', component: MaterialTypeComponent },
  { path: 'marc-template', component: MarcTemplateWorksheetComponent },
  { path: 'authority-files-management', component: AuthorityFilesManagementComponent },
  { path: 'catalog-records', component: CatalogRecordsComponent },
  { path: 'copy-cataloging', component: CopyCatalogingComponent },
  { path: 'items-for-processing', component: ItemsForProcessingComponent},
  { path: 'patronprevilege',component:PatronprevilegeComponent},
  { path: 'Binding', component: BindingComponent },
  { path: 'renewals', component: RenewalsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkin', component: CheckinComponent },
  { path: 'overdues',component:OverduesComponent},
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'orderinvoice', component: OrderinvoiceComponent },
  { path: 'registerissues', component: RegisterissueComponent },
  { path: 'binders', component: BindersComponent },
  { path: 'administration-module', component: SystemParametersComponent },
  { path: 'patron-management', component: PatronManagementComponent },
  { path: 'server-config', component: ServerConfigComponent },
  { path: 'loss', component: LossComponent },
  { path: 'Binding-Management', component: SerialsBindingManagementComponent },
  { path: 'Cataloging-Template', component: CatalogingTemplateComponent },
  { path: 'Audit-Report', component: AuditReportComponent },
  { path: 'Acquisitions-Report', component: AcquisitionsReportComponent },
  { path: 'patrone-category', component: PatronCategoryComponent },
  { path: 'Patron', component: PatronComponent },
  { path: 'trial', component: TrailComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
