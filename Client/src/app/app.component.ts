import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';
  users:any;

  constructor(private http:HttpClient)
  {


  }
  ngOnInit(): void {
    this.http.get('http://localhost:56811/api/User').subscribe(res=>{
      this.users=res
    },err=>{
      console.log(err);
    })
  }
}
