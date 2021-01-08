import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import SignIn from '../../models/signIn';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ]
  });

  signInData: SignIn = {
    username: '',
    password: ''
  };

  error: string = '';
  returnUrl: string = '';
  loading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.authenticationService.currentUserValue.access_token) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  signIn() {
    if (this.signInForm.dirty && this.signInForm.valid) {
      this.loading = true;

      this.signInData = Object.assign(
        {},
        this.signInData,
        this.signInForm.value
        );

      this.authenticationService.postToken(this.signInData)
          .pipe(first())
          .subscribe(
              data => {
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error;
                this.loading = false;
              });
    }
  }
}
