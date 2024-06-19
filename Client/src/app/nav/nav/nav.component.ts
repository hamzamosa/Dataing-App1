import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/-models/user';
import { AccountService } from 'src/app/_Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit
{
model:any={}
loggedIn:boolean=false;
dropdownOpen = false;

constructor(public accountServices:AccountService)
{

}
ngOnInit(): void {


}
Login()
{
 this.accountServices.login(this.model).subscribe(res=>{
console.log(res);
 
this.resetInput();

 },err=>{
  console.log(err)
 })


}

Logout()
{
  this.accountServices.logout();
  this.resetInput();

}

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

resetInput()
{
  this.model.userName = '';
    this.model.password = '';

}



}
