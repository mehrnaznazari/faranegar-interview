import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSandbox, FararuToastService } from 'fararu-common-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showLoginForm: boolean = false;

  constructor(
    private _authSandbox: AuthSandbox,
    private _toastService: FararuToastService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this._authSandbox.loggedUser) this.showLoginForm = true;
    else this.showLoginForm = false;

    this._authSandbox.loginLoaded$.subscribe((loaded) => {
      if (loaded) {
        this._router.navigate(['/sample']);
      }
    });
  }

  login() {
    if (this.username && this.password) {
      this._authSandbox.login({
        username: this.username, //'varanegar',
        password: this.password,
        accYear: 1404,
        centerId: 2,
        rememberMe: true,
      });
    } else {
      this._toastService.show({
        type: 'error',
        text: 'لطفا نام کاربری و رمز عبور را وارد کنید.',
      });
    }
  }
}
