// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GetPostsByCategoryUser } from '../models/member/getpostsbycategoryuser';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiServicePost {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7043/post'; // LOCAL ONLY

  // GET request to fetch data
  getPosts(
    catagoryidparam: number | undefined,
    useridparam: number | undefined,
  ): Observable<GetPostsByCategoryUser[]> {
    return this.http.get<GetPostsByCategoryUser[]>(
      this.apiUrl +
        `/hetPostsByCategoryUser?postcatagoryId=${catagoryidparam}&userid=${useridparam}`,
    );
  }
}
