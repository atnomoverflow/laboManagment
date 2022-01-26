import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public userClaims: any;
    public userClaims$ = new Subject<any>();
    userState: any;

    constructor(
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userState = user;
                localStorage.setItem('user', JSON.stringify(this.userState));
                let newUser = localStorage.getItem('user')
                JSON.parse(newUser == null ? "" : newUser);
            } else {
                localStorage.setItem('user', "");
                let newUser = localStorage.getItem('user')
                JSON.parse(newUser == null ? "" : newUser);
            }
        })
    }


    getUserClaims(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.onAuthStateChanged(user => {
                if (!!user) {
                    this.setUserClaims(user);
                    resolve(user);
                } else {
                    reject('No user logged in');
                }
            });
        });
    }

    getUserToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.afAuth.onAuthStateChanged(user => {
                if (!!user) {
                    user.getIdToken().then(token => resolve(token)).catch(() => reject('No token Available.'));
                } else {
                    reject('No user logged in');
                }
            });
        });
    }

    setUserClaims(user: any): void {
        this.userClaims = user;
        this.userClaims$.next(user);
    }


    // doFacebookLogin(): Promise<any> {
    //     return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    // }
    //
    // doTwitterLogin(): Promise<any> {
    //     return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    // }

    doGoogleLogin(): Promise<any> {
        return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }
    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userState: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userState, {
            merge: true
        })
    }
    get isLoggedIn(): boolean {
        let newUser = localStorage.getItem('user')
        
        return newUser === null ? false : true;
    }
    AuthLogin(provider: any) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.SetUserData(result.user);
                this.userState = result.user;
                this.ngZone.run(() => {
                    this.router.navigate(['/home']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.userState=null
          this.router.navigate(['/home']);
        })
      }  

}
