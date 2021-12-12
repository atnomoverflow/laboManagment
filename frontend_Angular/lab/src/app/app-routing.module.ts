import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenmentsComponent } from './evenments/evenments.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { PublicationsComponent } from './publications/publications.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {path:'members',component:MembersComponent},
  { path: 'evenments', component: EvenmentsComponent },
  {path:'publications',component:PublicationsComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
