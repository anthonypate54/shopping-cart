import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
            map((cart:any) => new ShoppingCart(cart.items) ));
    }

    private getItem(cartId: string, productId: string) {
       return this.db.object('/shopping-carts/' + cartId + '/items/' + productId); 
    }

    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem('cartId');
        if(cartId) 
            return cartId;

        let result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;
    }

    private async updateItem(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItem(cartId, product.key); 
        item$.valueChanges().pipe(
            take(1)).subscribe((item: any) => {
                console.log("item = ", item);
            if(item)
                item$.update({ 
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,    
                    quantity: item.quantity + change 
                });
             else {
                 item$.set({ 
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,    
                    quantity: 1 
                });
            }
         });
    }

    async addToCart(product: Product) {
        this.updateItem(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItem(product, -1);
     }
}
