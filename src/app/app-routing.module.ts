import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGeneratorFnComponent } from './data-generator-fn/data-generator-fn.component';

const routes: Routes = [
  { path: '', redirectTo: '/data-generator', pathMatch: 'full' },
  { path: 'data-generator', component: DataGeneratorFnComponent },
  // { path: 'data-generator-prod-brisim', component: DataGeneratorProdBRISIMComponent },
  // { path: 'data-generator-prod-isc', component: DataGeneratorProdISCComponent },
  // { path: 'data-generator-prod-hrd', component: DataGeneratorProdHRDComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
