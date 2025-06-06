import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../../environments/environment";
import { isPlatformBrowser } from "@angular/common";

const USER_KEY = 'user';

const CLAIMS = {
  NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  EMAIL: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
};


@Injectable({providedIn: 'root'})
export class JwtService {
    private jwtHelper = new JwtHelperService();

    constructor(@Inject(PLATFORM_ID) private platformId: Object){}

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    decodeToken(): any {
        const token = this.getToken();
        if (!token) return null;
        return this.jwtHelper.decodeToken(token);
    }

    getUserName(): string | null {
        const decoded = this.decodeToken();
        return decoded?.[CLAIMS.NAME] || null;
    }

    getEmail(): string | null {
        const decoded = this.decodeToken();
        return decoded?.[CLAIMS.EMAIL] || null;
    }

    getRole(): string | null {
        const decoded = this.decodeToken();
        return decoded?.[CLAIMS.ROLE] || null;
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        return token ? this.jwtHelper.isTokenExpired(token) : true;
    }
}