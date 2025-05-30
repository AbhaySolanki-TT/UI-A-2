import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_ENDPOINTS } from "../../shared/api-endpoints";
import { ApiService } from "./api.service";
import { ApiResponse } from "../Interfaces/ApiResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly ENDPOINT: string = 'Auth'

    constructor(
        private http: HttpClient,
        private router: Router,
        private service: ApiService
    ) { }

    login(credentials: { email: string; password: string }) {
        return this.service.post<ApiResponse<any>>(
            this.ENDPOINT + API_ENDPOINTS.AUTH.LOGIN,
            credentials
        );
    }

    logout() {
        localStorage.clear()
        this.router.navigate([API_ENDPOINTS.AUTH.LOGIN])
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(environment.identity_type);
    }
}