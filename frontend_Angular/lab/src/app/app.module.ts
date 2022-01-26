import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { PublicationsComponent } from './publications/publications.component';
import { EvenmentsComponent } from './evenments/evenments.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth/auth.service';
import { EvenementService } from './services/EvenementService/evenement.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { OutilsComponent } from './outils/outils.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { EditOutilFormComponent } from './edit-outil-form/edit-outil-form.component';
import { EditEvenmentFormComponent } from './edit-evenment-form/edit-evenment-form.component';
import { EditPublicationFormComponent } from './edit-publication-form/edit-publication-form.component';
import {MatSelectModule} from '@angular/material/select';
import { FormMembreComponent } from './form-membre/form-membre.component';
import { EditMemberFormComponent } from './edit-member-form/edit-member-form.component';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyATbXp7WZsL93AFAy6jPJPzD41qUh6Y9Ls",
  authDomain: "lab-managment-a0eb5.firebaseapp.com",
  projectId: "lab-managment-a0eb5",
  storageBucket: "lab-managment-a0eb5.appspot.com",
  messagingSenderId: "502724042502",
  appId: "1:502724042502:web:babfacc2665d241c1b8887"
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MembersComponent,
    PublicationsComponent,
    EvenmentsComponent,
    FooterComponent,
    ConfirmDialogComponent,
    EvenementFormComponent,
    OutilsComponent,
    OutilFormComponent,
    PublicationFormComponent,
    EditOutilFormComponent,
    EditEvenmentFormComponent,
    EditPublicationFormComponent,
    FormMembreComponent,
    EditMemberFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCarouselModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgbModule,
    MdbFormsModule,
    MatSelectModule
   
  ],
  providers: [
    AuthService,
    EvenementService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
