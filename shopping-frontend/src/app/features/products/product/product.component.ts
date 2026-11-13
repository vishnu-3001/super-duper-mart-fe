import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { WatchlistService } from 'src/app/core/services/watchlist.service';
import { CartProduct } from 'src/models/cart.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products:any[]=[];
  displayedColumns:string[]=[];
  errorMessage='';
  message='';

  constructor(private productService: ProductService,private authService: AuthService,private cartService: CartService,private watchlistService: WatchlistService,private router: Router) { }
  get isAdmin():boolean{
    return this.authService.getRole()==="ADMIN";
  }
  ngOnInit(): void {
    this.displayedColumns = this.isAdmin
    ? ['productId', 'productName', 'quantity', 'retailPrice','wholesalePrice','actions']
    : ['productId', 'productName', 'retailPrice', 'actions'];

  this.loadProducts();
  }
  loadProducts():void{
    this.errorMessage='';
    this.productService.getProducts().subscribe({
      next: response => {
        this.products = response.map(product => ({
          ...product,
          productId: product.productId ?? product.id,
          productName: product.productName ?? product.name
        }));
      },
      error: error => {
        this.errorMessage = 'Failed to load products';
        console.error(error);
      }
    });
  }
  viewProduct(productId:number):void{
    const path = this.isAdmin ? '/admin/products' : '/user/products';
    this.router.navigate([path, productId]);
  }
  editProduct(productId:number):void{
    this.router.navigate(['/admin/products',productId],{queryParams:{edit:'true'}});
  }
  addProduct():void{
    this.router.navigate(['/admin/products/new']);
  }
  addToCart(product:any):void{
    const cartproduct:CartProduct={productId: product.productId,productName: product.productName,retailPrice: product.retailPrice}
    this.cartService.addToCart(cartproduct,1);
    this.message="Product added successfully";
  }
  addToWatchList(productId:number):void{
    this.watchlistService.addToWatchlist(productId).subscribe({
      next:()=>{this.message="product added to watchlist successfully"},
      error:error=>{
        this.errorMessage =error.error?.message || 'Failed to add to watchlist';
      }
    });
  }
}

