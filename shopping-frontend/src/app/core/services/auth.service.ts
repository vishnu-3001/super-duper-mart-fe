import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiService } from "./api.service";
import { environment } from "src/environments/environment";

export interface Loginrequest{
    username:string;
    password:string;
}

export interface LoginResponse{
    token:string;
    role:string;
}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private apiSource:ApiService){}
    login(credentials:Loginrequest):Observable<LoginResponse>{
        const url=`${environment.authBaseUrl}/auth/login`;
        return this.apiSource.post<LoginResponse>(url,credentials).pipe(
            tap(
                response=>{
                    sessionStorage.setItem('auth_token',response.token);
                    sessionStorage.setItem('role',response.role);
                }
            )
        );
    }
    logout():void{
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('role');
    }
    getToken():string|null{
        return sessionStorage.get('auth_token');
    }
    getRole():string|null{
        return sessionStorage.get('role');
    }
    isLoggedIn():boolean{
        return this.getToken()!==null;
    }
    getShoppingBaseUrl():string|null{
        if(this.getRole()==="user"){
            return `${environment.shoppingBaseUrl}/user`;
        }
        if(this.getRole()==="admin"){
            return `${environment.shoppingBaseUrl}/admin`;
        }
    }
}