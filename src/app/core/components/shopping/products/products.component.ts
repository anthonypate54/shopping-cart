import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;
    cart$: Observable<ShoppingCart>;
 
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: ShoppingCartService) { 

     };

    async ngOnInit() {
         this.cart$ = await this.cartService.getCart();
         this.populateProducts();
    }

    private populateProducts() {
        this.productService.getAll().pipe(
            switchMap(products => {
                this.products = products;
                return this.route.queryParamMap;
            }))
            .subscribe(params => {
                this.category = params.get('category');
                this.applyFilter();
        });                     
    }

    private applyFilter() {
        this.filteredProducts = (this.category) ?  
            this.products.filter(p => p.category === this.category ) :
            this.products;

    }
}
