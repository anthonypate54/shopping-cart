import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    itemsRef: AngularFireList<any>;
    items: Observable<any[]>; 
 
    constructor(private db: AngularFireDatabase) { 
           this.itemsRef = db.list('/products');
          // Use snapshotChanges().map() to store the key
          this.items = this.itemsRef.snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          );
         }

    create(product) {
         return this.db.list('/products').push(product);
    }

    getAll() {
       // return this.db.list('/products');
          return this.itemsRef.snapshotChanges().pipe(
             map(res => 
                 res.map(c => ({ key: c.key,  ...c.payload.val() })
                 )
             )
         )
    }

    getProduct(productId) {
        return this.db.object('/products/' + productId).valueChanges();
      }

    update(productId, product) {
         return this.db.object('/products/' + productId).update(product);
    }

    delete(productId) {
         return this.db.object('/products/' + productId).remove()
        .catch(error => console.log(error));
    }
}
