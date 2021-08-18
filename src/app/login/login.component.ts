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
          // this.loginForm.reset();
          // this.router.navigate(['/login']);
          // UserDetails=result.data;
        }
        else {
          alert(result.message);
          console.log('you enter a wrong password / email combination');
        }
      });
    }

  }
  constructor(private authService: AuthServiceService,private router: Router) {}
    ngOnInit(): void {
  }

}
