import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbInputModule
  ]
})
export class AuthModule { }
