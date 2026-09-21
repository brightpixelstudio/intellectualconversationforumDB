// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GetCatagoryList } from '../models/utilities/getcatagorylist';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiServiceUtility {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7043/utility'; // LOCAL ONLY

  // GET request to fetch data
  getCatagoryList(): Observable<GetCatagoryList[]> {
    return this.http.get<GetCatagoryList[]>(this.apiUrl + '/GetCatagoryList');
  }
}
