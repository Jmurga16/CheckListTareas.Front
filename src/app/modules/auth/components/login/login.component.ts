import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  User = new FormControl();
  Password = new FormControl();


  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
  }


  //#region Login
  async fnLoginBBDD() {

    let pParametro = [];
    let nOpcion = 1

    pParametro.push(this.User.value);
    pParametro.push(this.Password.value);

    await this.authService.LoginBBDD(nOpcion, pParametro).subscribe({
      next: (data) => {

        if (data.cod == 1) {
          localStorage.setItem("username", this.User.value)
          this.router.navigate(['/task']);
        }
        else {
          Swal.fire({
            title: `Ingrese los datos correctamente.`,
            icon: 'warning',
            timer: 1500
          });
        }
      },
      error: (e) => {
        console.error(e)
      }
    });
  }
  //#endregion


  //#region Login
  async fnLogin() {

    let sUsuario = this.User.value;
    let sPassword = this.Password.value
    let isValid: boolean = false

    isValid = this.authService.Login(sUsuario, sPassword);

    if (isValid) {
      
      this.router.navigate(['/task']);
    }
    else {
      Swal.fire({
        title: `Ingrese los datos correctamente.`,
        icon: 'warning',
        timer: 1500
      });
    }

  }
  //#endregion


}
