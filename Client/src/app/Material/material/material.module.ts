import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


const materials :any=
[
  MatButtonModule,MatSelectModule
]

@NgModule({

  imports: [materials
  ],
  exports:[materials]

})
export class MaterialModule { }
