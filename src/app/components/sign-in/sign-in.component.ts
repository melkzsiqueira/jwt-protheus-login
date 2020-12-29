import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loading = false;
  submitted = false;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;
    this.authenticationService.postToken({ username: 'teste', password: 'teste' })
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              this.router.navigate(['/sign-in']);
            },
            error => {
              console.log('error');
              this.error = error;
              this.loading = false;
            });
  }
}
