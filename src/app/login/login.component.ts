import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: any = '';
  password: any = '';
  errorMessage: any = '';
  passwordVisible: any = '';
  p_icon = "remove_red_eye";


  constructor(private router: Router) {}

  onLogin() {
    const validUsername = 'scart';
    const validPassword = 'scart123@';

    if (this.username == validUsername && this.password == validPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('name',validUsername);
      sessionStorage.setItem('userStatus','no');
      this.router.navigate(['/products']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  toggle() {
    if ((document.getElementById("password") as HTMLInputElement).type == "password") {
      (document.getElementById("password") as HTMLInputElement).type = "text"
    }
    else {
      (document.getElementById("password") as HTMLInputElement).type = "password"
    }
  }
}
