import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localStorageName = "username"

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  Login() {

  }

  get currentUserValue(): boolean {
    let bValue: boolean = false;

    bValue = localStorage.getItem("username") != null ? true : false

    return bValue

  }

  Logout() {
    localStorage.removeItem(this.localStorageName);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

}
