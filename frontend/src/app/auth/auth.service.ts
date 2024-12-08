import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "./_models/user.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User | null>(null);
  apiUrl = environment.apiUrl;

  private jwtHelper = new JwtHelperService();
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  signIn(login: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/auth/login',
      {
        login,
        password,
      }
    ).pipe(
      catchError((err: HttpErrorResponse) => throwError(err.error.message)),
      tap((res: any) => {
        this.handleAuthentication(res.login, res.token, this.jwtHelper.decodeToken(res.token).exp);
      })
    );
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth/sign-in']).then();
  }

  autoLogin(): void {

    const userData: {
      login: string;
      token: string;
      tokenExpirationDate: string;
    } = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData') || '') : null;

    if (!userData) { return; }

    const loadedUser = new User(
      userData.login,
      userData.token,
      new Date(userData.tokenExpirationDate)
    );

    if (loadedUser.tokenFunc) {
      this.user.next(loadedUser);
    }

    const expirationDateInMs = new Date(userData.tokenExpirationDate).getTime();
    const expirationDuration = expirationDateInMs - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(login: string, token: string, expiresIn: number): void {

    const expirationDate = new Date(
      new Date().getTime() + expiresIn
    );

    const user = new User(login, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
