import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadSpinnerService } from '../../services/load-spinner/load-spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadSpinnerService: LoadSpinnerService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.loadSpinnerService.active({ message: 'Saindo...', load: true });

    setTimeout(() => {
      this.authenticationService.deleteToken();
      this.router.navigate(['/sign-in']);
      this.loadSpinnerService.active({ load: false });
    }, 1000);
  }
}
