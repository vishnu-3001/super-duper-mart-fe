import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoginRequest } from 'src/models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-frontend';
  constructor(private authService:AuthService){}
  ngOnInit():void{
    const request:LoginRequest={
      username:'john123',
      password:'John@123'
    }
    this.authService.login(request).subscribe(
      response => {
        console.log('Login successful:');
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
}
