import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoLanguage } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadSpinnerService } from 'src/app/services/load-spinner/load-spinner.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  returnUrl: string = '';

  languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Português' },
  ]
  
  constructor(
    private authenticationService: AuthenticationService,
    private loadSpinnerService: LoadSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.authenticationService.currentUserValue.access_token &&
      this.authenticationService.isSignIn) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  signIn(credentials: PoPageLogin): void {
    if (credentials.login && credentials.password) {
      this.loadSpinnerService.active(true, 'Entrando...');
    
      this.authenticationService
        .postToken(credentials)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loadSpinnerService.active(false);
            this.router.navigate([this.returnUrl]);
          },
          (error) => {
            this.loadSpinnerService.active(false);
          }
        );
    }
  }
}
