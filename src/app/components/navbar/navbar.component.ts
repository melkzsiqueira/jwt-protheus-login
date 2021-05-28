import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNavbarIconAction, PoNavbarItem } from '@po-ui/ng-components';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadSpinnerService } from '../../services/load-spinner/load-spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarItens: Array<PoNavbarItem> = [
    { action: () => {}, label: 'Home', link: '/home' }
  ]
  iconActions: Array<PoNavbarIconAction> = [
    { action: () => { this.logout() }, icon: 'po-icon-exit', label: 'Home' }
  ]

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadSpinnerService: LoadSpinnerService
  ) {}

  ngOnInit(): void {}

  logout(): void  {
    this.loadSpinnerService.active(true, 'Saindo...');

    setTimeout(() => {
      this.authenticationService.deleteToken();
      this.router.navigate(['/sign-in']);
      this.loadSpinnerService.active(false);
    }, 1000);
  }
}
