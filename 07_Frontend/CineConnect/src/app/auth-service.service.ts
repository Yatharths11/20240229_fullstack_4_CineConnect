// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  signin(username: string | null, password: string | null): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        // Assuming your token is in response.token, modify this line accordingly
        if (response.token) {
          this.setToken(response.token);
        } else {
          console.error('Token not present in server response.');
        }
      })
    );
  }






























  setToken(token: string): void {
    console.log('Setting token:', token);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null ? token : null;
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
