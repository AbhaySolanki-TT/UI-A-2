import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../Interfaces/ApiResponse';
import { GameZone } from '../Interfaces/GameZone';
import { API_ENDPOINTS } from '../../shared/ServiceEndpoints';
import { QueryParams } from '../Interfaces/QueryParams';

@Injectable({
  providedIn: 'root'
})
export class GameZoneService {

  constructor(private api: ApiService) {}

  getAll(params: QueryParams): Observable<ApiResponse<GameZone[]>> {
    return this.api.post<ApiResponse<GameZone[]>>(API_ENDPOINTS.GAMEZONE.GET_ALL, params);
  }

  getById(id: number): Observable<ApiResponse<GameZone>> {
    return this.api.get<ApiResponse<GameZone>>(API_ENDPOINTS.GAMEZONE.GET_BY_ID(id));
  }

  create(zone: GameZone): Observable<ApiResponse<any>> {
    return this.api.post<ApiResponse<any>>(API_ENDPOINTS.GAMEZONE.CREATE, zone);
  }

  update(zone: GameZone): Observable<ApiResponse<any>> {
    return this.api.put<ApiResponse<any>>(API_ENDPOINTS.GAMEZONE.UPDATE_BY_ID(zone.id!), zone);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.api.delete<ApiResponse<any>>(API_ENDPOINTS.GAMEZONE.DELETE(id));
  }

  count(): Observable<ApiResponse<number>> {
    return this.api.get<ApiResponse<number>>(API_ENDPOINTS.GAMEZONE.COUNT);
  }
}
