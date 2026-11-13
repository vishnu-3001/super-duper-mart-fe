
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from '../products/product/product.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { OrderComponent } from '../orders/order/order.component';
import { OrderDetailComponent } from '../orders/order-detail/order-detail.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'orders/:orderId',
    component: OrderDetailComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
