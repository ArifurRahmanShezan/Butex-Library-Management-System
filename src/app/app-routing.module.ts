import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoreComponent } from './components/database/restore/restore.component';



const routes: Routes = [
  { path: 'database/restore-backup', component: RestoreComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
