import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_ENDPOINTS } from "../../shared/ServiceEndpoints";
import { ApiService } from "./api.service";
import { ApiResponse } from "../Interfaces/ApiResponse";
import { RegisterComponent } from "../../Component/register/register.component";
import { AppRoutes } from "../../shared/NavigationRoutes";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private service: ApiService,
    ) { }

    login(credentials: { email: string; password: string }) {
        return this.service.post<ApiResponse<any>>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
        );
    }

    register(payload: RegisterComponent){
        return this.service.post<ApiResponse<any>>(
            API_ENDPOINTS.AUTH.REGISTER,
            payload
        );
    }

    logout() {
        localStorage.clear()
        this.router.navigate([AppRoutes.login])
    }

    isLoggedIn(): boolean {
        return !! this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem('token')
    }
}