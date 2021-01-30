import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes =[
  {path:"",component:ContactsComponent}
]

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule
  ]
})
export class ContactUsModule { }
