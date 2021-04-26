import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService:AuthService, private router: Router) { 

  }

  ngOnInit(): void {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(){
    this.message = 'Trying to log in ...';
    this.authService.login().subscribe(()=>{
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirectUrl = '/admin';
        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    })
  }

  logout(){
    this.authService.logout();
    this.setMessage();
  }

}
