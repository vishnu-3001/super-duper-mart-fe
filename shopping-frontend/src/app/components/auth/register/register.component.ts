import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterRequest } from 'src/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup;
  isLoading=false;
  errorMEssage='';
  successMessage='';
  constructor(private formBuilder:FormBuilder,private authService:AuthService) {
    this.registerForm=this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    });
   }
   onSubmit():void{
    if(this.registerForm.invalid||this.isLoading){
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading=false;
    this.errorMEssage='';
    this.successMessage='';
    const registerRequest:RegisterRequest={
      username:this.registerForm.get('username')?.value,
      email:this.registerForm.get('email')?.value,
      password:this.registerForm.get('password').value
    }
    this.authService.register(registerRequest).subscribe({
      next:response=>{
        this.isLoading=false;
        this.successMessage =
          `Register successful. Role: ${registerRequest.username}`;
      },
      error: error => {
        this.isLoading = false;
        this.errorMEssage =error.error?.message ||'Invalid details';
      }
    });
   }


}
