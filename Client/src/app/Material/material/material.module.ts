import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


const materials :any=
[
  MatButtonModule
]

@NgModule({

  imports: [materials
  ],
  exports:[materials]

})
export class MaterialModule { }
