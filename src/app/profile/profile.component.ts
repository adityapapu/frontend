import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(localStorage.getItem('firstName'),Validators.required),
    lastName: new FormControl(localStorage.getItem('lastName'),Validators.required),
    email: new FormControl(localStorage.getItem('email'),[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    gender: new FormControl(localStorage.getItem('gender'),Validators.required),
    phone: new FormControl(localStorage.getItem('phone'),Validators.required),
    id:new FormControl(localStorage.getItem('id'))
  });
  onUpdate(){
    this.authService.updateProfile(this.profileForm.value).subscribe(
      data => {
        localStorage.setItem('firstName',this.profileForm.value.firstName);
        localStorage.setItem('lastName',this.profileForm.value.lastName);
        localStorage.setItem('email',this.profileForm.value.email);
        localStorage.setItem('gender',this.profileForm.value.gender);
        localStorage.setItem('phone',this.profileForm.value.phone);
        if(data.success) {
          alert('Your account has been update successfully')
          console.log('success');
        }
        else {
          alert(data.message);
          console.log('update failed');
        }

        
      })
    }

  

  constructor(private authService: AuthServiceService,private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }

    this.authService.getProfile(this.profileForm.value).subscribe(
      result => {
        if(result.success) {
          console.log('success');
          this.profileForm.setValue({
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            phone: result.data.phone,
            id: result.data.id,
            gender: result.data.gender
          })

        }
        else {
          alert(result.message);
          console.log('update failed');
        }

        
      })
    


    console.log(localStorage.getItem('email'));
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('token'));


  }

}
