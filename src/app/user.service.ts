import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireObject } from '@angular/fire/database/interfaces';
import firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
      this.db.object('/users/' + user.uid).update({
          name: user.displayName,
          email: user.email
      });
  }

  get(uid: string): AngularFireObject<AppUser> {
      return this.db.object('/users/' + uid);
   }
}