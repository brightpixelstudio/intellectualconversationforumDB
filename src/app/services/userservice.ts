// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllProfileMembers } from '../models/getallprofilemembers';
/*
import { Work } from '../models/work';
import { Technology } from '../models/technology';
import { Quote } from '../models/quote';
*/

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiServiceUser {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7043/user'; // LOCAL ONLY

  // GET request to fetch data
  getAllProfileMembers(): Observable<GetAllProfileMembers[]> {
    return this.http.get<GetAllProfileMembers[]>(this.apiUrl + '/GetAllProfileMembers');
  }

  // POST request to send data
  //createWork: Omit<Post, 'id'>): Observable<Work> {
  //  return this.http.post<Work>(this.apiUrl, post);
  //}
}
