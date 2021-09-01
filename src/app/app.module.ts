import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { ParloursModule } from './core/parlours/parlours.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OpenService } from './shared/services/open.service';
import { ConsultantModule } from './core/consultants/consultant.module';
import { PlansModule } from './core/plans/plans.module';
import { MainMembersModule } from './core/main-members/main_members.module';
// import { ServicesModule } from './core/services/services.module';
import { HomeModule } from './core/home/home.module';
import { LoginModule } from './core/login/login.module';
import { SignupModule } from './core/signup/signup.module';

const rootRouting: ModuleWithProviders<AppModule> = RouterModule.forRoot([
  { path: '',
    pathMatch: 'full',
    redirectTo: '/parlours' }
], { useHash: false, relativeLinkResolution: 'legacy' });

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule,
    ParloursModule,
    ConsultantModule,
    PlansModule,
    MainMembersModule,
    // ServicesModule,
    HomeModule,
    LoginModule,
    SignupModule
  ],
  providers: [OpenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
