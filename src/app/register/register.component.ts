import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  profileForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required)
  });

  onSubmit() {
    console.warn(this.profileForm.value);
    if(this.profileForm.valid) {
      this.authService.register(this.profileForm.value).subscribe(result => {
        // console.log(result);
        console.log(result.success);
        if(result.success) {
          alert('Your account has been registered successfully')
          console.log('success');
          this.profileForm.reset();
          this.router.navigate(['/login']);
        }
        else {
          alert(result.message);
          console.log('failed');
        }
      });
    }
  }
  constructor(private authService: AuthServiceService,private router: Router) {}







}
