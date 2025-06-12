import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QueryParams } from '../Interfaces/QueryParams';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Interfaces/ApiResponse';
import { API_ENDPOINTS } from '../../shared/ServiceEndpoints';
import { UserInfo } from '../Interfaces/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private api:ApiService) { }

    GetAll(params: QueryParams): Observable<ApiResponse<any>>{
      return this.api.post<ApiResponse<any>>(
        API_ENDPOINTS.ROLE.GETALL, params)
    }
  
    GetByID(id: number): Observable<ApiResponse<any>>{
      return this.api.get<ApiResponse<any>>(
        API_ENDPOINTS.ROLE.GET_BY_ID(id))
    }
  
    GetUserCount(): Observable<ApiResponse<any>>{
      return this.api.get<ApiResponse<any>>(
        API_ENDPOINTS.ROLE.USERCOUNT)
    }
  
    Create(data: UserInfo): Observable<ApiResponse<any>> {
      return this.api.post<ApiResponse<any>>(
        API_ENDPOINTS.ROLE.CREATE, data)
    }
    
    Update(data: UserInfo): Observable<ApiResponse<any>> {
      return this.api.post<ApiResponse<any>>(
        API_ENDPOINTS.ROLE.UPDATE, data)
    }
  
    Delete(id: number): Observable<ApiResponse<any>> {
      return this.api.delete<ApiResponse<any>>(
        API_ENDPOINTS.ROLE.DELETE(id))
    }
}
