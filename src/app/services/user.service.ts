import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/users`)
      .pipe(map((response: any) => response['data']));
  }

  getUserById(id: number) {
    return this.http.get(`${this.url}/users/${id}`)
      .pipe(map((response: any) => response['data']));
  }
}
