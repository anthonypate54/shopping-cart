import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;
    cart: any;
    subscription: Subscription;

    constructor(
        route: ActivatedRoute,
        productService: ProductService,
        private cartService: ShoppingCartService) { 

        productService.getAll().pipe(
            switchMap(products => {
                this.products = products;
                return route.queryParamMap;
            })).subscribe(params => {
                this.category = params.get('category');

        this.filteredProducts = (this.category) ?  
            this.products.filter(p => p.category === this.category ) :
            this.products;
        });               
    };

    async ngOnInit() {
         this.subscription = (await this.cartService.getCart()).pipe()
        .subscribe(cart => { this.cart = cart; console.log("cart = ", cart)});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
