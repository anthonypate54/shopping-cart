import { fromPromise } from "rxjs/internal-compatibility";
import { Product } from './product';

export class ShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;

    constructor(public product: Product, public quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
    get totalPrice() {
        return this.product.price * this.quantity;
    }
}