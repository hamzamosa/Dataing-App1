import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from './-models/user';
import { AccountService } from './_Services/account.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';
  users:any;

  constructor(private http:HttpClient,private accountService:AccountService)
  {
    

  }
  ngOnInit(): void {
  
    this.setCurrentUser();
  }
  setCurrentUser(): void {
    const userData: string | null = localStorage.getItem('user');
    if (userData !== null) {
      const user: IUser| null = JSON.parse(userData);
      this.accountService.setCurrentUser(user);
    }
  }


}
