import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    catRef: AngularFireList<any>;
    cat$: Observable<any[]>;
  
    constructor(private db: AngularFireDatabase) {
    
      this.catRef = db.list('/categories');
       this.cat$ = this.catRef.snapshotChanges().pipe(
          map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }));
     }));
    }
     
    getAll() {
         return this.cat$;
      }

}
