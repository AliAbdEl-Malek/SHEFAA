import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('../app/components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact', 
    loadChildren: () => import('../app/components/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'registeration',
    loadChildren: () => import('../app/components/registeration/registeration.module').then(m => m.RegisterationModule)
  },
  {
    path: '',
    loadChildren: () => import('../app/components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../app/components/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'shared', 
    loadChildren: () => import('../app/components/shared/shared.module').then(m => m.SharedModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
