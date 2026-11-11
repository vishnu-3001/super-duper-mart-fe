import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse,HttpParams } from "@angular/common/http";
import { Observable,throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})
export class ApiService{
    constructor(private http:HttpClient){}
    private buildParams(params:any={}):HttpParams{
        let httpParams=new HttpParams();
        Object.keys(params).forEach(
            key=>{
                const value=params[key];
                if(value!=null&&value!=undefined){
                    httpParams = httpParams.set(key, String(value));
                }
            }
        );
        return httpParams;
    }
    private handleError(error:HttpErrorResponse):Observable<never>{
        if(error.status==0){
            console.error("network not available");
        }
        else{
            console.error('API request failed. Status:', error.status);
        }
        return throwError(error);
    }
    private request<T>(
        method:string,
        url:string,
        body?:any,
        params?:any
    ):Observable<T>{
        return this.http.request<T>(method,url,{
            body:body,
            params:this.buildParams(params)
        }).pipe(
            catchError(error => this.handleError(error))
        );
    }
    get<T>(url:string,params?:any):Observable<T>{
        return this.request('GET',url,undefined,params);
    }
    post<T>(url:string,body:any):Observable<T>{
        return this.request('POST',url,body);
    }
    patch<T>(url:string,body?:any):Observable<T>{
        return this.request('PATCH',url,body);
    }
    delete<T>(url:string,params?:any):Observable<T>{
        return this.request('DELETE',url,undefined,params);
    }
}