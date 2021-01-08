import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingPageComponent } from '../components/loading-page/loading-page.component';
import { SignInFormComponent } from '../components/sign-in-form/sign-in-form.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    SignInComponent,
    LoadingPageComponent,
    SignInFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignInComponent,
    LoadingPageComponent,
    SignInFormComponent
  ]
})
export class PagesModule { }
