import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: false
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkUser();
  }

  // setting current user if exist date on datastorage
  // if user doesnt exist then auth.guard move user to urltree = /logowanie
  private checkUser(): void {
    this.authService.autoLogin();
  }
}
