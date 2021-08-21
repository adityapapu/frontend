import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(private router: Router){ }
  goToProfile(){
    this.router.navigate(['/profile']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
      if(localStorage.getItem('gender') === 'male'){
         const genderClass='fa fa-male'
      }
      else{
         const genderClass='fa fa-female'
    }
  }
}