import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { IndexComponent } from './index/index.component';
import { UserProfileAndPreviousOrdersComponent } from './user-profile-and-previous-orders/user-profile-and-previous-orders.component';

const routes: Routes =[
  {path:"info",component:UserProfileAndPreviousOrdersComponent},
  {path:"edit",component:UpdateProfileComponent}

]

@NgModule({
  declarations: [UpdateProfileComponent, IndexComponent, UserProfileAndPreviousOrdersComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
