import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { EvenmentsComponent } from './evenments/evenments.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { PublicationsComponent } from './publications/publications.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MembersComponent },
  { path: 'evenments', component: EvenmentsComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'sign-up', component: PublicationsComponent },
  {
    path : 'form',
    pathMatch : 'full',
    component : EvenementFormComponent
  },
  {
    path : 'evenments/:id/edit',
    pathMatch: 'full',
    component : EvenementFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
