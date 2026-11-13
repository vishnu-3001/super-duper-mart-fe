
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductSharedModule } from '../products/product-shared.module';
import { OrderSharedModule } from '../orders/order-shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ProductSharedModule,
    OrderSharedModule
  ]
})
export class AdminModule {}
