import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../../shared/ServiceEndpoints';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../Interfaces/ApiResponse';
import { QueryParams } from '../Interfaces/QueryParams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  GetAll(params: QueryParams): Observable<ApiResponse<any>>{
    return this.api.post<ApiResponse<any>>(
      API_ENDPOINTS.USER.GETALL, params)
  }

  GetByID(id: number): Observable<ApiResponse<any>>{
    return this.api.post<ApiResponse<any>>(
      API_ENDPOINTS.USER.GET_BY_ID(id) , null)
  }

}