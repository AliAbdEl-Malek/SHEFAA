import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes :Routes = [
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent},
  {path:'resetPassword', component:ResetPasswordComponent},
];


@NgModule({
  declarations: [SignupComponent, LoginComponent, ForgetPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),FormsModule,ReactiveFormsModule
  ]
})
export class RegisterationModule { }
