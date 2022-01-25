import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEvenmentFormComponent } from './edit-evenment-form/edit-evenment-form.component';
import { EditOutilFormComponent } from './edit-outil-form/edit-outil-form.component';
import { EditPublicationFormComponent } from './edit-publication-form/edit-publication-form.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { EvenmentsComponent } from './evenments/evenments.component';
import { FormMembreComponent } from './form-membre/form-membre.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { OutilsComponent } from './outils/outils.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { PublicationsComponent } from './publications/publications.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MembersComponent },
  { path: 'evenments', component: EvenmentsComponent },
  { path: 'outils', component: OutilsComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'sign-up', component: PublicationsComponent },
  {
    path : 'addEvent',
    pathMatch : 'full',
    component : EvenementFormComponent
  },
  {
    path : 'evenments/:id/edit',
    pathMatch: 'full',
    component : EditEvenmentFormComponent
  },
  {
    path : 'addOutil',
    pathMatch : 'full',
    component : OutilFormComponent
  },
  {
    path : 'outils/:id/edit',
    pathMatch: 'full',
    component : EditOutilFormComponent
  },
  {
    path : 'addPublication',
    pathMatch : 'full',
    component : PublicationFormComponent
  },
  {
    path : 'publications/:id/edit',
    pathMatch: 'full',
    component : EditPublicationFormComponent
  },
  {
    path : 'addMember',
    pathMatch : 'full',
    component : FormMembreComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
