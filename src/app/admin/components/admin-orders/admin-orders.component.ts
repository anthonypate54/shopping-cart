import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
    orders$;

    constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();   
  }

  ngOnInit(): void {
  }

}
