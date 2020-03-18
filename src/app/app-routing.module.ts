import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectCityComponent } from './select-city/select-city.component';


const routes: Routes = [
  {path:"search", component:SelectCityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
