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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCarouselModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
