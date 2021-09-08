import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from "@angular/router";
import { UserDetails } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({

    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(2)]),
  });

  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(result => {
        console.log(result);
        console.log(result.success);
        if(result.success) {
          alert('Your login sucessfully')
          localStorage.setItem('firstName', result.data.firstName);
          localStorage.setItem('lastName', result.data.lastName);
          localStorage.setItem('phone', result.data.phone);
          localStorage.setItem('id', result.data.id);
          localStorage.setItem('gender', result.data.gender);
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('email', result.data.email);


          this.router.navigate(['home']);
          // UserDetails=result.data;
        }
        else {
          alert(result.message);
          console.log('you enter a wrong password / email combination');
        }
      }, error => {
        alert(error.error.message)
      });
    }

  }
  constructor(private authService: AuthServiceService,private router: Router) {}
    ngOnInit(): void {
      if(localStorage.getItem('token') != null) {
        this.router.navigate(['home']);
      }
  }

}
