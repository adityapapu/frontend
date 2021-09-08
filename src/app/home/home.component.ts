import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName=localStorage.getItem('firstName');

  constructor() { }
  getName()
  {
    return localStorage.getItem('firstName');
  }


  ngOnInit(): void {
    console.log(localStorage.getItem('key'));

  }

}
