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
//import { OnApprovalsupplyComponent } from './acquisitions/on-approvalsupply/on-approvalsupply.component';




const routes: Routes = [
  { path: 'database-restore', component: RestoreComponent },
  { path: '', component: DashboardComponent },
  { path: 'letters-holidays-form', component: LettersHolidaysComponent },
  { path: 'rss', component: RssFeedComponent },
  { path: 'eod', component: EodProcessComponent },
  { path: 'budget-vendor', component: BudgetComponent} ,
  { path:'gift',component:GiftComponent},
  { path:'accesssioning',component:AccessioningComponent},
  { path:'Request-Processing',component:RequestProcessingComponent},
  //{ path:'On-Approval-Supplies',component:OnApprovalsupplyComponent},
  { path:'firm-order',component:FirmOrderComponent},
  { path:'claim',component:ClaimComponent},
  { path:'invoice-payment',component:InvoicepaymentComponent},
  { path: 'material-type', component: MaterialTypeComponent },
  { path: 'marc-template', component: MarcTemplateWorksheetComponent },
  { path: 'authority-files-management', component: AuthorityFilesManagementComponent },
  { path: 'catalog-records', component: CatalogRecordsComponent },
  { path: 'items-for-processing', component: ItemsForProcessingComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
