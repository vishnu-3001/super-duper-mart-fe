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
                }
            )
        );
    }
    logout():void{
        sessionStorage.removeItem('auth_token');
    }
    getToken():string|null{
        return sessionStorage.get('auth_token');
    }
    isLoggedIn():boolean{
        return this.getToken()!==null;
    }
}