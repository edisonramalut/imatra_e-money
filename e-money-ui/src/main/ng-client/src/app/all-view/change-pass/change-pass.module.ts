import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ChangePassRoutingModule} from "./change-pass-routing.module";
import {CustomMaterialModule} from "../../core/module/CustomMaterialModule";
import {ChangePassComponent} from "./change-pass.component";
import {LoginService} from "../app-services/login.service";

@NgModule({
  imports: [
    CommonModule,
    ChangePassRoutingModule,
    //HttpClientModule,
    CustomMaterialModule
  ],
  declarations: [ChangePassComponent],
  providers: [
    // HttpService,
    // ChangePassService,
    LoginService,
    DatePipe
  ]
})
export class ChangePassModule { }
