import { reducers, metaReducers } from './reducers/index';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './store/reducer/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({user:userReducer}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
