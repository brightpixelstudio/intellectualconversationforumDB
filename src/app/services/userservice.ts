// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllProfileMembers } from '../models/getallprofilemembers';
import { GetNewestMembers } from '../models/getnewestmembers';
import { GetMostPostsMembers } from '../models/getmostpostsmembers';
import { GetLatestLoginsMembers } from '../models/getlatestloginsmembers';

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

  // GET request to fetch data
  getNewestMembers(): Observable<GetNewestMembers[]> {
    return this.http.get<GetNewestMembers[]>(this.apiUrl + '/GetNewestMembers');
  }

  // GET request to fetch data
  getMostPostsMembers(): Observable<GetMostPostsMembers[]> {
    return this.http.get<GetMostPostsMembers[]>(this.apiUrl + '/GetMostPostsMembers');
  }

  // GET request to fetch data
  getLatestLoginsMembers(): Observable<GetLatestLoginsMembers[]> {
    return this.http.get<GetLatestLoginsMembers[]>(this.apiUrl + '/getLatestLoginsMembers');
  }

  // Accept the raw data value as an argument
  submitRegistrationForm(formData: any): Observable<any> {
    console.log(formData);
    return this.http.post(this.apiUrl + '/addNewMember', formData);
  }

  // POST request to send data
  //createWork: Omit<Post, 'id'>): Observable<Work> {
  //  return this.http.post<Post>(this.apiUrl, post);
  //}
}
