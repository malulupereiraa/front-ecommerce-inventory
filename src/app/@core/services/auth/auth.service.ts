import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  router = inject(Router);

  private http = inject(HttpClient);

  constructor() { }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post(environment.baseUrl + '/Login', user).pipe(
      tap((response: any) => this.doLoginUser(user, response.token))
    )
  }

  private doLoginUser(user: any, token: any): void {
    this.loggedUser = user.username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(this.JWT_TOKEN)) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
    return this.isAuthenticatedSubject.value;
  }
}
