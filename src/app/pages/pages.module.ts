import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule, PoPageLoginModule } from '@po-ui/ng-templates';

import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    SignInComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoTemplatesModule,
    PoPageLoginModule,    
  ],
  exports: [
    SignInComponent,
  ]
})
export class PagesModule { }
