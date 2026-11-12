import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRequest } from 'src/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  isLoading=false;
  errorMessage='';
  successMessage=''

  constructor(private formBuilder:FormBuilder,private authService:AuthService) {
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
   }
   onSubmit():void{
    if(this.loginForm.invalid||this.isLoading){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading=true;
    this.errorMessage='';
    this.successMessage='';
    const loginRequest:LoginRequest={
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(loginRequest).subscribe({
      next:response=>{
        this.isLoading=false;
        this.successMessage =
          `Login successful. Role: ${loginRequest.username}`;
      },
      error: error => {
        this.isLoading = false;
        this.errorMessage =error.error?.message ||'Invalid username or password';
      }
    });
   }

}
