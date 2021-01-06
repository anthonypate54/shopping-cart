import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import '@firebase/auth';

import { EMPTY, Observable } from 'rxjs';
import firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$:  Observable<firebase.User>;

    constructor(private userService: UserService, 
        private afAuth:  AngularFireAuth, 
        private  route:  ActivatedRoute,
        private router: Router) { 
            
            this.user$ = afAuth.authState;
    }

    login() {
        console.log("AT LOGIN");
        let url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', url);
        this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.afAuth.signOut()
        .then( () => {
            this.router.navigate(['/']);
        });
     }

    get appUser$() : Observable<AppUser> {
        return this.user$.pipe(
            switchMap( user => {
            tap(t => console.log('USER = ', user));
                if(user)
                    return this.userService.get(user.uid).valueChanges();

                return EMPTY;
            }));
    }

    // async login(email: string, password: string) {
    //     console.log('at login');
    //      var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    //      .then(user => {
    //         console.log(user);
    //      })π
    //      .catch((error) => {
    //          let errorCode = error.code;
    //          let errorMessage = error.message;
    //          console.log('errorCode =', errorCode);
    //          console.log('errorMessage =', errorMessage);

    //      });
     
    //     this.router.navigate(['/']);
    // }

    // async register(email: string, password: string) {
    //     var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    //     this.sendEmailVerification();
    // }
    // async sendEmailVerification() {
    //     (await this.afAuth.currentUser).sendEmailVerification();
    //     this.router.navigate(['admin/verify-email']);
    // }   

    // async sendPasswordResetEmail(passwordResetEmail: string) {
    //     return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    //  }

    //  get isLoggedIn(): boolean {
    //     const  user  =  JSON.parse(localStorage.getItem('user'));
    //     return  user  !==  null;
    // }

    // async  loginWithGoogle(){
    //     await  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //     this.router.navigate(['/']);
    // }
  }
