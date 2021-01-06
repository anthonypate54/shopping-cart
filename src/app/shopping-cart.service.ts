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

    private async updateItemQuantity(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItem(cartId, product.key); 
        item$.valueChanges().pipe(
            take(1)).subscribe((item: any) => {
            if(item)
                item$.update({ quantity: item.quantity + change });
            else
                item$.set({ product, quantity: 1 });
         });
    }

    async addToCart(product: Product) {
        this.updateItemQuantity(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItemQuantity(product, -1);
     }
}
