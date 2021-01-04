import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataTableResource } from 'angular5-data-table';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products: Product[];
     subscription: Subscription;
    tableResource: DataTableResource<Product>;
    items: Product[] = [];
    itemCount: number;

    constructor(private productService: ProductService) { 
        this.subscription = this.productService.getAll().pipe(
        ).subscribe(products => {
            this.products = products;
            this.initializeTable(products);
         });
     }

    private initializeTable(products: Product[]) {
        this.tableResource = new DataTableResource(products);
        this.tableResource.query({ offset: 0 })
        .then(items => this.items = items);

        this.tableResource.count()
        .then(count => this.itemCount = count);

    }

    reloadItems(params) {
         if(!this.tableResource)
            return;
        this.tableResource.query( params )
        .then(items => this.items = items);
    }
    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filter(query: string) {
        let filteredProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
        this.initializeTable(filteredProducts);
    }

}
