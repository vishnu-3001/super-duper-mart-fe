import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService:AuthService,public cartservice:CartService,private router:Router) { }
  get role():string|null{
    return this.authService.getRole();
  }
  logout():void{
    this.authService.logout();
    this.cartservice.clearCart();
    this.router.navigate(['/login']);
  }
}
