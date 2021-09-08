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
  fullName=""
  thumbUrl="assets/face.png"
  profileForm = new FormGroup({
    firstName: new FormControl("",Validators.required),
    lastName: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    gender: new FormControl("",Validators.required),
    phone: new FormControl("",Validators.required),
    id:new FormControl(localStorage.getItem('id'))
  });
  onUpdate(){
    this.authService.updateProfile(this.profileForm.value).subscribe(
      data => {
        this.profileForm.patchValue({password:""})
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
          this.profileForm.patchValue({
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            phone: result.data.phone,
            id: result.data.id,
            gender: result.data.gender
          })
          localStorage.setItem('firstName',result.data.firstName);
          
        }
        else {
          alert(result.message);
          console.log('update failed');
        }

        
      })
    
    this.profileForm.valueChanges.subscribe(
      data => {
        this.fullName=data.firstName+" "+data.lastName
        if(data.gender!="Others")
        {
        this.thumbUrl="https://fakeface.rest/thumb/view?gender="+data.gender.toLowerCase()+"&maximum_age=25&minimum_age=15"
        }
        else
        {
          this.thumbUrl="assets/face.png"

        }

      }
    )

  }

}
