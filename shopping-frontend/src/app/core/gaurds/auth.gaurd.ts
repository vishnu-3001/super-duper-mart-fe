import { Injectable } from "@angular/core";
import { CanActivate,ActivatedRouteSnapshot,Router,RouterStateSnapshot,UrlTree} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn:'root'
})
export class AuthGaurd implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
          return this.router.createUrlTree(['/login']);
        }
        const userRole = this.authService.getRole();
        const requiredRole = route.data['role'];
        if (!requiredRole) {
          return true;
        }
        if (userRole === requiredRole) {
          return true;
        }
        return false;
    }
}