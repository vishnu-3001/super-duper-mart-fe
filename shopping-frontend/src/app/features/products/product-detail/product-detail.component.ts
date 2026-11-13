import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

import { ProductService } from 'src/app/core/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductRequest } from 'src/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:any=null;
  productId:number|null=null;

  isCreateMode=false;
  isEditMode=false;
  isLoading=false;
  errorMessage='';
  productForm:FormGroup;

  constructor(private productService:ProductService,private authService:AuthService,private formbuilder:FormBuilder,private route:ActivatedRoute,private router:Router) {
    this.productForm=this.formbuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      wholesalePrice: [0, [Validators.required, Validators.min(0)]],
      retailPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }
  get isAdmin():boolean{
    return this.authService.getRole()==="ADMIN";
  }
  ngOnInit(): void {
    this.isCreateMode=this.route.snapshot.routeConfig?.path === 'products/new';
    if(this.isCreateMode){
      this.isEditMode=true;
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage = 'Invalid product ID';
      return;
    }
    this.productId = id;
    const openInEditMode =this.isAdmin &&this.route.snapshot.queryParamMap.get('edit') === 'true';
    this.loadProduct(openInEditMode);
  }
  loadProduct(openInEditMode = false): void {
    if (this.productId === null) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getProductDetail(this.productId).subscribe({
      next: response => {
        this.product = {
          ...response,
          productId: response.productId ?? response.id,
          productName: response.productName ?? response.name
        };
        this.productForm.patchValue({
          productName: this.product.productName,
          description: this.product.description,
          wholesalePrice: this.product.wholesalePrice,
          retailPrice: this.product.retailPrice,
          quantity: this.product.quantity
        });
        this.isEditMode = openInEditMode;
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = 'Unable to load product';
        this.isLoading = false;
        console.error(error);
      }
    });
  }
  enableEdit(): void {
    if (this.isAdmin) {
      this.isEditMode = true;
    }
  }
  cancelEdit(): void {
    if (this.isCreateMode) {
      this.router.navigate(['/admin/products']);
      return;
    }
    this.isEditMode = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { edit: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    this.productForm.patchValue(this.product);
  }

  saveProduct(): void {
    if (!this.isAdmin || this.isLoading) {
      return;
    }
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const request: ProductRequest =this.productForm.getRawValue();
    this.isLoading = true;
    this.errorMessage = '';
    if (this.isCreateMode) {
      this.productService.createProduct(request).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/admin/products']);
        },
        error: error => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'Failed to create product';
        }
      });
      return;
    }
    if (this.productId === null) {
      this.isLoading = false;
      return;
    }
    this.productService.updateProduct(this.productId,request).subscribe({
      next: () => {
        this.isEditMode = false;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { edit: null },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
        this.loadProduct();
      },
      error: error => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Failed to update product';
      }
    });
  }
}
