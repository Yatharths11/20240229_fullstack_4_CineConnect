// navbar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  public isAuthenticated(): boolean {
    // Check if there is a token in local storage
    return !!localStorage.getItem('authToken');
  }
}
