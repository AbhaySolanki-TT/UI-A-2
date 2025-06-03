import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../../environments/environment";
import { isPlatformBrowser } from "@angular/common";

const USER_KEY = 'user';

@Injectable({providedIn: 'root'})
export class JwtService {
    private jwtHelper = new JwtHelperService();

    constructor(@Inject(PLATFORM_ID) private platformId: Object){}

    getToken(): string | null {
        // if(isPlatformBrowser(this.platformId))
        // {
        //     return localStorage.getItem('token');//environment.identity_type)
        // }
        // return null;
        return localStorage.getItem('token');//environment.identity_type)
    }

    decodeToken(): any {
        const token = this.getToken();
        if (!token) return null;
        return this.jwtHelper.decodeToken(token);
    }

    getUserName(): string | null {
        const decoded = this.decodeToken();
        return decoded?.nameid || null;
    }

    getEmail(): string | null {
        const decoded = this.decodeToken();
        return decoded?.email || null;
    }

    getRole(): string | null {
        const decoded = this.decodeToken();
        return decoded?.role || null;
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        return token ? this.jwtHelper.isTokenExpired(token) : true;
    }
}