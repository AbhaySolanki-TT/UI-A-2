import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Interfaces/ApiResponse';
import { QueryParams } from '../Interfaces/QueryParams';
import { TimeSlot } from '../Interfaces/TimeSlot';
import { API_ENDPOINTS } from '../../shared/ServiceEndpoints';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(private api: ApiService) { }

  getAll(params: QueryParams): Observable<ApiResponse<TimeSlot[]>> {
    return this.api.post<ApiResponse<TimeSlot[]>>(API_ENDPOINTS.TIMESLOT.GET_ALL, params);
  }

  getAvailable(params: QueryParams): Observable<ApiResponse<TimeSlot[]>> {
    return this.api.post<ApiResponse<TimeSlot[]>>(API_ENDPOINTS.TIMESLOT.GET_AVAILABLE, params);
  }

  register(slot: any): Observable<ApiResponse<any>> {
    return this.api.post<ApiResponse<any>>(API_ENDPOINTS.TIMESLOT.CREATE, slot);
  }

  update(updatedSlot: any): Observable<ApiResponse<any>> {
    return this.api.put<ApiResponse<any>>(API_ENDPOINTS.TIMESLOT.UPDATE_BY_ID(updatedSlot.id), updatedSlot);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.api.delete<ApiResponse<any>>(API_ENDPOINTS.TIMESLOT.DELETE(id));
  }

  getBookingStats(params: any): Observable<ApiResponse<any>> {
    return this.api.post<ApiResponse<any>>(API_ENDPOINTS.TIMESLOT.STATS, params);
  }
}
