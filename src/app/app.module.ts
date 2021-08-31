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
    MainMembersModule
  ],
  providers: [OpenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
