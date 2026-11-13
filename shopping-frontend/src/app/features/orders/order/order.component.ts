import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderSummary } from 'src/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders:OrderSummary[]=[];
  displayedColumns: string[] = [
    'orderId',
    'placedAt',
    'status',
    'actions'
  ];
  isLoading=false;
  updatingOrderId:string|null=null;
  errorMessage='';
  constructor(private orderservice:OrderService,private authservice:AuthService,private router:Router) { }

  get isAdmin():boolean{
    return this.authservice.getRole()==="ADMIN";
  }
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders():void{
    this.isLoading=true;
    this.errorMessage='';
    this.orderservice.getOrders().subscribe({
      next:response=>{
        this.orders=response;
        this.isLoading=false;
      },
      error:error=>{
        this.isLoading=false;
        this.errorMessage= error.error?.message || 'Failed to load orders';
      }
    });
  }
  viewOrder(orderId: string): void {
    const path = this.isAdmin
      ? '/admin/orders'
      : '/user/orders';

    this.router.navigate([path, orderId]);
  }
  changeStatus(order: OrderSummary,action: 'cancel' | 'complete'): void {
    if (this.updatingOrderId !== null) {
      return;
    }
    if (order.status !== 'PROCESSING') {
      return;
    }
    if (action === 'complete' && !this.isAdmin) {
      return;
    }
    this.updatingOrderId = order.orderId;
    this.errorMessage = '';
    this.orderservice.updateOrder(
      order.orderId,
      action
    ).subscribe({
      next: () => {
        this.updatingOrderId = null;
        this.loadOrders();
      },
      error: error => {
        this.updatingOrderId = null;
        this.errorMessage =
          error.error?.message || 'Failed to update order';
      }
    });
  }
}
