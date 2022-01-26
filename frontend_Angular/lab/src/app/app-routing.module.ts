import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEvenmentFormComponent } from './edit-evenment-form/edit-evenment-form.component';
import { EditMemberFormComponent } from './edit-member-form/edit-member-form.component';
import { EditOutilFormComponent } from './edit-outil-form/edit-outil-form.component';
import { EditPublicationFormComponent } from './edit-publication-form/edit-publication-form.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { EvenmentsComponent } from './evenments/evenments.component';
import { FormMembreComponent } from './form-membre/form-membre.component';
import { AuthGuard } from './garde/auth.guard';
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
    component: EvenementFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'evenments/:id/edit',
    pathMatch: 'full',
    component: EditEvenmentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'addOutil',
    pathMatch : 'full',
    component: OutilFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'outils/:id/edit',
    pathMatch: 'full',
    component: EditOutilFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'addPublication',
    pathMatch : 'full',
    component: PublicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'publications/:id/edit',
    pathMatch: 'full',
    component: EditPublicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'addMember',
    pathMatch : 'full',
    component: FormMembreComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'members/:id/edit',
    pathMatch: 'full',
    component: EditMemberFormComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
