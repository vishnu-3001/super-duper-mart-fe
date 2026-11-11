import { Component,OnInit } from '@angular/core';
import { AuthService, Loginrequest } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-frontend';
  constructor(private authService:AuthService){}
  ngOnInit():void{
    const request:Loginrequest={
      username:'john123',
      password:'John@123'
    }
    this.authService.login(request).subscribe(
      response => {
        console.log('Login successful:', response);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
}
