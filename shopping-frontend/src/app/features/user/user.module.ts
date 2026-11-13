
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserRoutingModule } from './user-routing.module';
import { ProductSharedModule } from '../products/product-shared.module';
import { OrderSharedModule } from '../orders/order-shared.module';
import { WatchlistComponent } from './watchlist/watchlist.component';

@NgModule({
  declarations: [
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ProductSharedModule,
    OrderSharedModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class UserModule {}
