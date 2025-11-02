import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RestoreComponent } from './components/database/restore/restore.component';
import { BudgetComponent } from './acquisitions/budget/budget.component';
import { GiftComponent } from './acquisitions/gift/gift.component';
import { AccessioningComponent } from './acquisitions/accessioning/accessioning.component';
import { RestoreComponent } from './database/restore/restore.component';




const routes: Routes = [
  { path: 'database-restore', component: RestoreComponent },
  { path: 'budget-vendor', component: BudgetComponent} ,
  { path:'gift',component:GiftComponent},
  {path:'accesssioning',component:AccessioningComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
