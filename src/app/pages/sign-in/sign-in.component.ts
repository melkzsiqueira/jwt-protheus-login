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

  loading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
                console.log(data);
                this.router.navigate(['/sign-in']);
                this.loading = false;
              },
              error => {
                console.log(error);
                this.loading = false;
              });
    }
  }
}
