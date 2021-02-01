// <<<<<<< HEAD
import { SharedModule } from './../shared/shared.module';
// =======
import { AuthGuard } from './../../auth.guard';
// >>>>>>> 884b2cf6bf0fa4dfb9e7a73a86a99c5770dd5865
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { IndexComponent } from './index/index.component';
import { UserProfileAndPreviousOrdersComponent } from './user-profile-and-previous-orders/user-profile-and-previous-orders.component';

const routes: Routes =[
  {path:"info",component:UserProfileAndPreviousOrdersComponent, canActivate:[AuthGuard]},
  {path:"edit",component:UpdateProfileComponent, canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [UpdateProfileComponent, IndexComponent, UserProfileAndPreviousOrdersComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule
  ]
})
export class ProfileModule { }
