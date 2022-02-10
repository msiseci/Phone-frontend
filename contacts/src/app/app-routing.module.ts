import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { PersonComponent } from './components/person/person.component';


const routes: Routes = [
  {path:"",pathMatch:"full", component:PersonComponent},
  {path:"people",component:PersonComponent},
  {path:"people/add",component:PersonAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
    
  ]
})
export class AppRoutingModule { }
