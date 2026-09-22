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
    catagoryidparam: number | null,
    useridparam: number | null,
  ): Observable<GetPostsByCategoryUser[]> {
    var queryString = '';
    const catagoryParam =
      catagoryidparam == null || catagoryidparam == 0 ? '' : `postcatagoryId=${catagoryidparam}`;
    const userParam = useridparam == null || useridparam == 0 ? '' : `userId=${useridparam}`;

    // build the string based on values.
    queryString = catagoryParam;
    if (catagoryParam.length > 0 && userParam.length > 0) {
      queryString += '&' + userParam;
    } else if (catagoryParam.length == 0 && userParam.length > 0) {
      queryString = userParam;
    }

    return this.http.get<GetPostsByCategoryUser[]>(
      this.apiUrl + '/getPostsByCategoryUser?' + queryString,
    );
  }
}
