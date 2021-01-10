import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
    orders$;

    constructor(
        private authService: AuthService,
        private orderService: OrderService) {
        
            this.orders$ = authService.user$.pipe(
                switchMap(u => orderService.getOrdersByUser(u.uid))
            )
    }

ngOnInit(): void {
}
    

}
