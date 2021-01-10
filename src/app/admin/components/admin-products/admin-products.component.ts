import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, AfterViewInit {
    displayedColumns: string[] = ['title', 'price', 'action'];    
    products: Product[];
    subscription: Subscription;

    dataSource: MatTableDataSource<Product> | null;
    dataLength: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private productService: ProductService) { 
        this.subscription = this.productService.getAll().pipe(
        ).subscribe(products => {
            this.products = products;
            this.dataSource = new MatTableDataSource(products);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;    
            this.dataLength = products.length;
          });
     }

 
    ngAfterViewInit() {
     }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    applyFilter(query: string) {

        const filterValue = query.trim().toLowerCase();
        this.dataSource.filter = filterValue; 

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
}
