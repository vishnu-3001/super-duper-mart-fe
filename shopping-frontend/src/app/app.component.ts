import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-frontend';
  constructor(private authService:AuthService,private router:Router){}
  get showNavBar():boolean{
    if(!this.authService.isLoggedIn()){
      return false;
    }
    const currentUrl = this.router.url.split('?')[0];
    if(currentUrl==='/login'||currentUrl==='/register') {
      return false;
    }
    return true;
  }
}

