// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    // Assuming your API endpoint for user information is '/info'
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('authToken')}`, // Retrieve the token from local storage
    });
    return this.http.get(`${this.apiUrl}/info`, { headers });
  }
}
