import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  @Output() cancelRegister=new EventEmitter();
  model:any={};
constructor(private accountService:AccountService)
{

}
register()
{
  this.accountService.Register(this.model).subscribe(resp=>{
    console.log(resp);
    this.cancel();
  },erro=>{
    console.log(erro);
  })

}

cancel()
{

  this.cancelRegister.emit(false);

 
}


}
